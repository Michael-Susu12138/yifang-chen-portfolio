/**
 * store.js — visit records and the aggregates the visitor map renders.
 *
 * Persistence is delegated to persistence.js, which writes JSON files locally
 * and Upstash Redis on Vercel. Every record carries pre-computed time fields so
 * filtering by day/week/hour never needs date parsing.
 */
import { persistence } from "./persistence.js";

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday",
];

async function readAll() {
  const records = await persistence.allVisits();
  return records.map(normalize);
}

/** Backfill time fields on records written before this schema existed. */
function normalize(v) {
  if (v.ts) return v;
  return { ...v, ...timeFields(new Date(v.visited_at).getTime()) };
}

// ── Time helpers ──────────────────────────────────────────────────────────────

/** ISO-8601 week number, e.g. "2026-W30". */
function isoWeek(d) {
  const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7)); // shift to Thursday
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
  return `${t.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

/** The visitor's own wall-clock time, from ip-api's UTC offset in seconds. */
function visitorLocalTime(ms, offsetSeconds) {
  if (typeof offsetSeconds !== "number") return null;
  const shifted = new Date(ms + offsetSeconds * 1000);
  const sign = offsetSeconds >= 0 ? "+" : "-";
  const abs = Math.abs(offsetSeconds);
  const hh = String(Math.floor(abs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((abs % 3600) / 60)).padStart(2, "0");
  return `${shifted.toISOString().slice(0, 19)}${sign}${hh}:${mm}`;
}

function timeFields(ms, offsetSeconds) {
  const d = new Date(ms);
  return {
    visited_at: d.toISOString(),               // canonical UTC instant
    ts: ms,                                    // epoch ms — sort/range filters
    date: d.toISOString().slice(0, 10),        // YYYY-MM-DD (UTC)
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    day: d.getUTCDate(),
    hour_utc: d.getUTCHours(),
    weekday: WEEKDAYS[d.getUTCDay()],
    iso_week: isoWeek(d),
    local_time: visitorLocalTime(ms, offsetSeconds),
  };
}

// ── Mutations ─────────────────────────────────────────────────────────────────

/** Append a visit and return its assigned id. */
export function addVisit(visit, offsetSeconds) {
  return persistence.appendVisit({
    ...visit,
    ...timeFields(Date.now(), offsetSeconds),
  });
}

/** Merge extra fields into an existing visit (used by async enrichment). */
export function updateVisit(id, patch) {
  return persistence.patchVisit(id, patch);
}

/** Most recent visit from `ip` within `withinHours`, or undefined. */
export async function findRecentByIp(ip, withinHours = 1) {
  const cutoff = Date.now() - withinHours * 3_600_000;
  const records = await readAll();
  return records.reverse().find((v) => v.ip === ip && v.ts > cutoff);
}

// ── Queries ───────────────────────────────────────────────────────────────────

/**
 * Filter visits.
 *
 * @param from     ISO date/datetime — inclusive lower bound
 * @param to       ISO date/datetime — inclusive upper bound
 * @param country / countryCode / region / county / city — case-insensitive exact
 * @param q        free-text across all location fields
 * @param order    "asc" | "desc" (default desc = newest first)
 */
export async function queryVisits(filters = {}) {
  const {
    from, to, country, countryCode, region, county, city, q,
    limit = 100, offset = 0, order = "desc",
  } = filters;

  const eq = (a, b) => a && b && String(a).toLowerCase() === String(b).toLowerCase();

  // A bare date like "2026-07-27" as an upper bound should include that whole
  // day, so extend it to the final millisecond.
  const fromMs = from ? new Date(from).getTime() : -Infinity;
  const toMs = to
    ? new Date(to).getTime() + (/^\d{4}-\d{2}-\d{2}$/.test(to) ? 86_399_999 : 0)
    : Infinity;

  const all = await readAll();
  let rows = all.filter((v) => {
    if (v.ts < fromMs || v.ts > toMs) return false;
    if (country && !eq(v.country, country)) return false;
    if (countryCode && !eq(v.country_code, countryCode)) return false;
    if (region && !eq(v.region, region)) return false;
    if (county && !eq(v.county, county)) return false;
    if (city && !eq(v.city, city)) return false;
    if (q) {
      const hay = [
        v.city, v.region, v.country, v.county, v.district,
        v.suburb, v.neighbourhood, v.postcode, v.isp, v.org, v.ip,
      ].filter(Boolean).join(" ").toLowerCase();
      if (!hay.includes(String(q).toLowerCase())) return false;
    }
    return true;
  });

  rows.sort((a, b) => (order === "asc" ? a.ts - b.ts : b.ts - a.ts));

  return {
    total: rows.length,
    limit: Number(limit),
    offset: Number(offset),
    visits: rows.slice(Number(offset), Number(offset) + Number(limit)),
  };
}

/** Aggregate stats for the dashboard, honouring the same date filters. */
export async function getStats(filters = {}) {
  const { visits: records } = await queryVisits({
    ...filters,
    limit: Infinity,
    offset: 0,
  });

  const totalVisits = records.length;
  const uniqueVisitors = new Set(records.map((v) => v.ip)).size;

  const tally = (keyFn, shape) => {
    const map = {};
    for (const v of records) {
      const key = keyFn(v);
      if (!key) continue;
      if (!map[key]) map[key] = { ...shape(v), count: 0 };
      map[key].count++;
    }
    return Object.values(map).sort((a, b) => b.count - a.count);
  };

  const byCountry = tally(
    (v) => v.country,
    (v) => ({ country: v.country, country_code: v.country_code })
  ).slice(0, 10);

  const byCity = tally(
    (v) => v.city && `${v.city}|${v.region}|${v.country}`,
    (v) => ({
      city: v.city, region: v.region,
      country: v.country, country_code: v.country_code,
    })
  ).slice(0, 10);

  const byCounty = tally(
    (v) => v.county && `${v.county}|${v.region}|${v.country}`,
    (v) => ({ county: v.county, region: v.region, country: v.country })
  ).slice(0, 10);

  // Daily histogram — handy for spotting traffic spikes
  const byDay = tally((v) => v.date, (v) => ({ date: v.date })).sort((a, b) =>
    a.date.localeCompare(b.date)
  );

  // Map pinpoints, collapsed to ~1 km so repeat visits share one pin
  const pointMap = {};
  for (const v of records) {
    if (typeof v.lat !== "number" || typeof v.lon !== "number") continue;
    const key = `${v.lat.toFixed(2)}|${v.lon.toFixed(2)}`;
    if (!pointMap[key]) {
      pointMap[key] = {
        lat: v.lat, lon: v.lon,
        city: v.city, region: v.region,
        country: v.country, country_code: v.country_code,
        county: v.county, district: v.district,
        suburb: v.suburb, neighbourhood: v.neighbourhood,
        postcode: v.postcode ?? v.zip,
        count: 0, last_visit: v.visited_at,
      };
    }
    const p = pointMap[key];
    p.count++;
    if (v.visited_at > p.last_visit) p.last_visit = v.visited_at;
    // Later records may have been enriched after the first one was pinned
    p.county ??= v.county;
    p.suburb ??= v.suburb;
    p.neighbourhood ??= v.neighbourhood;
  }
  const points = Object.values(pointMap).sort((a, b) => b.count - a.count);

  const recentVisits = records.slice(0, 25).map((v) => ({
    city: v.city, region: v.region, country: v.country,
    country_code: v.country_code, county: v.county,
    district: v.district, suburb: v.suburb, neighbourhood: v.neighbourhood,
    postcode: v.postcode ?? v.zip, isp: v.isp,
    visited_at: v.visited_at, local_time: v.local_time,
  }));

  return {
    totalVisits, uniqueVisitors,
    byCountry, byCity, byCounty, byDay,
    points, recentVisits,
    firstVisit: records.length ? records[records.length - 1].visited_at : null,
    lastVisit: records.length ? records[0].visited_at : null,
  };
}
