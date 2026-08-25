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
import { persistence } from "./persistence.js";

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

// ── Nominatim rate limiter ────────────────────────────────────────────────────
// Their policy is max 1 request/second. Chain every call through one promise
// so concurrent visitors queue up instead of firing in parallel. This only
// serialises within a single process, which is why the shared cache below
// matters so much once several serverless instances are warm.

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
  const cached = await persistence.getGeo(key);
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

    await persistence.setGeo(key, detail);
    return detail;
  } catch {
    return {};
  }
}
