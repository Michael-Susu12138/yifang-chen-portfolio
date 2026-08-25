/**
 * geo.js — IP geolocation + reverse geocoding.
 *
 * Two stages, because no single free source gives everything:
 *
 *   1. ip-api.com   IP → city, district, zip, lat/lon, ISP, timezone.
 *   2. Nominatim    lat/lon → county, suburb, neighbourhood, road, postcode.
 *
 * Stage 2 is the "more specific than city" layer. Note the honest caveat:
 * it refines the *coordinate ip-api guessed*, which is typically an ISP
 * centroid, not the visitor's doorstep. County is usually trustworthy;
 * neighbourhood is a best-effort hint, not a fact.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_PATH = path.join(__dirname, "data", "geocache.json");

const IP_API_FIELDS = [
  "status", "message", "query",
  "continent", "continentCode",
  "country", "countryCode",
  "region", "regionName",
  "city", "district", "zip",
  "lat", "lon",
  "timezone", "offset",
  "isp", "org", "as", "asname",
  "mobile", "proxy", "hosting",
].join(",");

// Identify ourselves per the Nominatim usage policy.
const USER_AGENT =
  "yifang-chen-portfolio/1.0 (visitor map; yifangc@uchicago.edu)";

// ── Reverse-geocode cache ─────────────────────────────────────────────────────
// Coordinates repeat constantly (same ISP centroid), so caching keeps us well
// inside Nominatim's 1 req/sec policy.

let cache = null;

function loadCache() {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_PATH, "utf8"));
  } catch {
    cache = {};
  }
  return cache;
}

function saveCache() {
  fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2), "utf8");
}

// ── Nominatim rate limiter ────────────────────────────────────────────────────
// Their policy is max 1 request/second. Chain every call through one promise
// so concurrent visitors queue up instead of firing in parallel.

let queue = Promise.resolve();

function rateLimited(fn) {
  const result = queue.then(fn);
  queue = result.then(
    () => new Promise((r) => setTimeout(r, 1100)),
    () => new Promise((r) => setTimeout(r, 1100))
  );
  return result;
}

// ── Public API ────────────────────────────────────────────────────────────────

/** True for loopback / LAN addresses that ip-api cannot resolve. */
export function isPrivateIp(ip) {
  if (!ip) return true;
  const v4 = ip.replace(/^::ffff:/, "");
  return (
    v4 === "::1" ||
    v4 === "localhost" ||
    /^127\./.test(v4) ||
    /^10\./.test(v4) ||
    /^192\.168\./.test(v4) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(v4) ||
    /^169\.254\./.test(v4) ||
    /^f[cd]/i.test(v4)
  );
}

/**
 * Look up an IP. Passing a private address makes ip-api resolve the caller's
 * own public IP, which is what keeps local development producing real data.
 */
export async function lookupIp(ip) {
  const target = isPrivateIp(ip) ? "" : ip;
  const url = `http://ip-api.com/json/${target}?fields=${IP_API_FIELDS}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
  return res.json();
}

/**
 * Refine coordinates into county / suburb / neighbourhood / postcode.
 * Returns {} on any failure — enrichment must never break a visit log.
 */
export async function reverseGeocode(lat, lon) {
  if (typeof lat !== "number" || typeof lon !== "number") return {};

  // ~110 m precision: fine enough to distinguish neighbourhoods, coarse
  // enough that repeat visitors reuse the cached entry.
  const key = `${lat.toFixed(3)},${lon.toFixed(3)}`;
  const cached = loadCache()[key];
  if (cached) return cached;

  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2` +
      `&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;

    const res = await rateLimited(() =>
      fetch(url, {
        headers: { "User-Agent": USER_AGENT, "Accept-Language": "en" },
        signal: AbortSignal.timeout(8000),
      })
    );

    if (!res.ok) return {};
    const data = await res.json();
    const a = data.address || {};

    const detail = {
      county: a.county || a.state_district || null,
      city_district: a.city_district || a.borough || null,
      suburb: a.suburb || a.quarter || null,
      neighbourhood: a.neighbourhood || a.residential || null,
      road: a.road || null,
      postcode: a.postcode || null,
      // Nominatim's own display name is a useful human-readable fallback
      place_label: data.display_name || null,
    };

    cache[key] = detail;
    saveCache();
    return detail;
  } catch {
    return {};
  }
}
