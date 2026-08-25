/**
 * persistence.js — swappable storage for visit records and the geocode cache.
 *
 * Local development writes JSON files under backend/data/. Vercel's filesystem
 * is read-only apart from an ephemeral /tmp, so a deployment with Upstash Redis
 * credentials talks to Redis instead. Both backends expose the same async
 * interface, so store.js and geo.js never learn which one is active.
 *
 * Visits live in a hash keyed by id rather than a list because background
 * enrichment patches individual records after they are written.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");

const VISITS_KEY = "visits";
const VISITS_SEQ_KEY = "visits:seq";
const GEOCACHE_KEY = "geocache";

// The Upstash Marketplace integration injects UPSTASH_*; the retired Vercel KV
// integration used KV_*. Accept either so existing projects keep working.
const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const usingRedis = Boolean(REDIS_URL && REDIS_TOKEN);

// ── File backend ──────────────────────────────────────────────────────────────

function filePath(name) {
  return path.join(DATA_DIR, `${name}.json`);
}

function readJson(name, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath(name), "utf8"));
  } catch {
    return fallback;
  }
}

function writeJson(name, value) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(filePath(name), JSON.stringify(value, null, 2), "utf8");
}

const fileBackend = {
  async allVisits() {
    return readJson("visits", []);
  },

  async appendVisit(record) {
    const records = readJson("visits", []);
    const id = (records[records.length - 1]?.id ?? 0) + 1;
    records.push({ ...record, id });
    writeJson("visits", records);
    return id;
  },

  async patchVisit(id, patch) {
    const records = readJson("visits", []);
    const i = records.findIndex((v) => v.id === id);
    if (i === -1) return false;
    records[i] = { ...records[i], ...patch };
    writeJson("visits", records);
    return true;
  },

  async getGeo(key) {
    return readJson("geocache", {})[key] ?? null;
  },

  async setGeo(key, value) {
    const cache = readJson("geocache", {});
    cache[key] = value;
    writeJson("geocache", cache);
  },
};

// ── Redis backend ─────────────────────────────────────────────────────────────

let redisPromise = null;

async function getRedis() {
  if (!redisPromise) {
    redisPromise = import("@upstash/redis").then(
      ({ Redis }) => new Redis({ url: REDIS_URL, token: REDIS_TOKEN })
    );
  }
  return redisPromise;
}

const redisBackend = {
  async allVisits() {
    const redis = await getRedis();
    const all = (await redis.hgetall(VISITS_KEY)) || {};
    // hgetall gives an id-keyed object; restore the ascending order that the
    // file backend gets for free from array append order.
    return Object.values(all).sort((a, b) => a.id - b.id);
  },

  async appendVisit(record) {
    const redis = await getRedis();
    const id = await redis.incr(VISITS_SEQ_KEY);
    await redis.hset(VISITS_KEY, { [id]: { ...record, id } });
    return id;
  },

  async patchVisit(id, patch) {
    const redis = await getRedis();
    const existing = await redis.hget(VISITS_KEY, String(id));
    if (!existing) return false;
    await redis.hset(VISITS_KEY, { [id]: { ...existing, ...patch } });
    return true;
  },

  async getGeo(key) {
    const redis = await getRedis();
    return (await redis.hget(GEOCACHE_KEY, key)) ?? null;
  },

  async setGeo(key, value) {
    const redis = await getRedis();
    await redis.hset(GEOCACHE_KEY, { [key]: value });
  },
};

export const persistence = usingRedis ? redisBackend : fileBackend;

export const backendName = usingRedis ? "upstash-redis" : "json-file";
