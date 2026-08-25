/**
 * api/index.js — Vercel Function entry point for the whole API.
 *
 * vercel.json rewrites every /api/* request here, and Express does the routing
 * from there, so the deployed API is the same code path as local development.
 */
import app from "../backend/app.js";

export default function handler(req, res) {
  // Depending on how the rewrite is applied, the function can be invoked with
  // the path already stripped down to "/". Express routes are declared with the
  // /api prefix, so put it back before handing over.
  if (!req.url.startsWith("/api")) {
    req.url = `/api${req.url === "/" ? "" : req.url}`;
  }
  return app(req, res);
}
