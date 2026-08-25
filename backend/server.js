/**
 * server.js — local/self-hosted entry point.
 *
 * Wraps the shared Express app with a listening socket and, in production mode,
 * static serving of the built frontend. On Vercel neither of those applies:
 * static assets are served from the CDN and the app runs via api/index.js.
 */
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
import app from "./app.js";
import { backendName } from "./persistence.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const IS_PROD = process.env.NODE_ENV === "production";

// ─── Serve frontend in production ─────────────────────────────────────────────
if (IS_PROD) {
  const frontendDist = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(frontendDist, "index.html"));
  });
}

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(
    `✅ Server on http://localhost:${PORT} [${IS_PROD ? "production" : "dev"}]`
  );
  console.log(`   Storage: ${backendName}`);
  if (IS_PROD) console.log(`   Serving frontend from ../frontend/dist`);
});
