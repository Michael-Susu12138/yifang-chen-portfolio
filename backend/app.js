/**
 * app.js — the Express app and its API routes, with no server bootstrap.
 *
 * Kept free of `listen` and static-file serving so the exact same routes can
 * run two ways: behind `node server.js` locally, and as a single Vercel
 * Function via api/index.js in production.
 */
import express from "express";
import cors from "cors";
import {
  addVisit,
  updateVisit,
  findRecentByIp,
  getStats,
  queryVisits,
} from "./store.js";
import { lookupIp, reverseGeocode } from "./geo.js";
import { backendName } from "./persistence.js";

const IS_PROD = process.env.NODE_ENV === "production";

// On Vercel the instance can be frozen as soon as a response is sent, so
// fire-and-forget work would silently vanish. Detect it and await instead.
const IS_SERVERLESS = Boolean(process.env.VERCEL);

// Repeat visits from one IP inside this window are not logged again.
// Disabled in dev so refreshing the page always records something.
const DEDUP_MINUTES = Number(
  process.env.VISIT_DEDUP_MINUTES ?? (IS_PROD ? 60 : 0)
);

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(
  cors({
    origin: IS_PROD
      ? false
      : ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);

// Trust proxy headers so req.ip is correct behind Nginx/Cloudflare/Vercel
app.set("trust proxy", true);

// ─── Helpers ───────────────────────────────────────────────────────────────────

function getRealIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers["x-real-ip"];
  if (realIp) return realIp.trim();
  return req.socket?.remoteAddress;
}

/**
 * Refine a logged visit with county / suburb / postcode. Nominatim is rate
 * limited to 1 req/sec, so locally this runs after the response is sent — the
 * visit is already saved by the time it lands.
 */
async function enrich(id, lat, lon) {
  try {
    const detail = await reverseGeocode(lat, lon);
    if (Object.keys(detail).length) await updateVisit(id, detail);
  } catch (err) {
    console.error("[enrich]", err.message);
  }
}

// ─── Routes ────────────────────────────────────────────────────────────────────

/**
 * POST /api/visit — called by the frontend on page load.
 */
app.post("/api/visit", async (req, res) => {
  try {
    const rawIp = getRealIp(req);

    if (DEDUP_MINUTES > 0 && (await findRecentByIp(rawIp, DEDUP_MINUTES / 60))) {
      return res.json({
        success: true,
        skipped: true,
        reason: "recently logged",
      });
    }

    const geo = await lookupIp(rawIp);

    if (geo.status !== "success") {
      await addVisit({ ip: rawIp });
      return res.json({ success: true, logged: true, geoFailed: geo.message });
    }

    // geo.query is the address ip-api actually resolved — for a local request
    // that is this machine's public IP, which is what we want to store.
    const id = await addVisit(
      {
        ip: geo.query || rawIp,
        continent: geo.continent,
        country: geo.country,
        country_code: geo.countryCode,
        region: geo.regionName,
        region_code: geo.region,
        city: geo.city,
        district: geo.district || null,
        zip: geo.zip || null,
        lat: geo.lat,
        lon: geo.lon,
        timezone: geo.timezone,
        utc_offset_seconds: geo.offset,
        isp: geo.isp,
        org: geo.org,
        asn: geo.as,
        as_name: geo.asname,
        is_mobile: geo.mobile,
        is_proxy: geo.proxy,
        is_hosting: geo.hosting,
      },
      geo.offset
    );

    if (IS_SERVERLESS) {
      await enrich(id, geo.lat, geo.lon);
      return res.json({ success: true, logged: true, city: geo.city });
    }

    // Respond immediately; county/suburb detail lands a moment later.
    res.json({ success: true, logged: true, city: geo.city });
    enrich(id, geo.lat, geo.lon);
  } catch (err) {
    console.error("[/api/visit]", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/stats — dashboard aggregates.
 * Optional: ?from=2026-01-01&to=2026-12-31
 */
app.get("/api/stats", async (req, res) => {
  try {
    res.json(await getStats(req.query));
  } catch (err) {
    console.error("[/api/stats]", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/visits — the raw, filterable visit log.
 * e.g. /api/visits?from=2026-07-01&to=2026-07-31&country=United%20States&limit=50
 */
app.get("/api/visits", async (req, res) => {
  try {
    res.json(await queryVisits(req.query));
  } catch (err) {
    console.error("[/api/visits]", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/visits.csv — same filters, spreadsheet-ready.
 */
app.get("/api/visits.csv", async (req, res) => {
  try {
    const { visits } = await queryVisits({ ...req.query, limit: Infinity });
    const cols = [
      "id", "visited_at", "ts", "date", "weekday", "hour_utc", "iso_week",
      "local_time", "timezone", "ip", "country", "country_code", "region",
      "county", "city", "district", "suburb", "neighbourhood", "postcode",
      "zip", "lat", "lon", "isp", "org", "asn", "is_proxy", "is_hosting",
    ];
    const escape = (val) => {
      if (val === null || val === undefined) return "";
      const s = String(val);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const csv = [
      cols.join(","),
      ...visits.map((v) => cols.map((c) => escape(v[c])).join(",")),
    ].join("\n");

    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="visits.csv"');
    res.send(csv);
  } catch (err) {
    console.error("[/api/visits.csv]", err.message);
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /api/health — confirms which storage backend is live. Useful right after
 * a deploy to check the Redis credentials actually arrived.
 */
app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    storage: backendName,
    serverless: IS_SERVERLESS,
    env: IS_PROD ? "production" : "dev",
  });
});

export default app;
