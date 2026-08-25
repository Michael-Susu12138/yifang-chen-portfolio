import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import VisitorMap from "./VisitorMap";
import "./VisitorTracker.css";

// Convert ISO 3166-1 alpha-2 country code → flag emoji (e.g. "US" → 🇺🇸)
const toFlagEmoji = (code) => {
  if (!code || code.length !== 2) return "🌐";
  return [...code.toUpperCase()]
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join("");
};

const timeAgo = (iso) => {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);
  if (diff < 60) return `${Math.max(diff, 0)}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// Most specific place name available, falling back up the hierarchy
const labelFor = (v) =>
  [v.neighbourhood || v.suburb || v.district, v.city, v.region]
    .filter(Boolean)
    .join(", ") || v.country || "Unknown";

// Full detail for the hover title, including the visitor's own local clock
const fullDetail = (v) => {
  const place = [
    v.neighbourhood, v.suburb, v.district, v.city,
    v.county, v.region, v.postcode, v.country,
  ].filter(Boolean).join(", ");
  const utc = new Date(v.visited_at).toUTCString();
  const local = v.local_time ? `\nTheir local time: ${v.local_time}` : "";
  return `${place}\nUTC: ${utc}${local}${v.isp ? `\nISP: ${v.isp}` : ""}`;
};

const VisitorTracker = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const logged = useRef(false); // StrictMode mounts effects twice in dev

  useEffect(() => {
    const load = async () => {
      try {
        if (!logged.current) {
          logged.current = true;
          // Log this visit first so the stats we fetch include it
          await fetch("/api/visit", { method: "POST" });
        }
        const res = await fetch("/api/stats");
        setStats(await res.json());
      } catch {
        setError(true);
      }
    };
    load();
  }, []);

  // Close the modal on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (error) {
    return (
      <div className="vt-root vt-error">
        <span>🌍</span>
        <p>Visitor tracker offline</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="vt-root vt-loading">
        <div className="vt-spinner" />
        <span>Loading map…</span>
      </div>
    );
  }

  const maxCount = stats.byCountry[0]?.count ?? 1;

  return (
    <div className="vt-root">
      {/* Mini map — click to expand */}
      <button
        className="vt-map-thumb"
        onClick={() => setOpen(true)}
        title="Click to explore the full map"
      >
        <VisitorMap points={stats.points} />
        <span className="vt-map-expand">⤢ Expand</span>
      </button>

      <div className="vt-counters">
        <div className="vt-counter">
          <span className="vt-counter-value">
            {stats.totalVisits.toLocaleString()}
          </span>
          <span className="vt-counter-label">visits</span>
        </div>
        <div className="vt-divider" />
        <div className="vt-counter">
          <span className="vt-counter-value">
            {stats.uniqueVisitors.toLocaleString()}
          </span>
          <span className="vt-counter-label">unique</span>
        </div>
        <div className="vt-divider" />
        <div className="vt-counter">
          <span className="vt-counter-value">{stats.byCountry.length}</span>
          <span className="vt-counter-label">countries</span>
        </div>
      </div>

      {/* ── Full-screen detail modal ── */}
      {open &&
        createPortal(
          <div className="vt-modal-backdrop" onClick={() => setOpen(false)}>
            <div className="vt-modal" onClick={(e) => e.stopPropagation()}>
              <div className="vt-modal-head">
                <h3>🌍 Visitor Map</h3>
                <button
                  className="vt-close"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="vt-modal-stats">
                <div>
                  <strong>{stats.totalVisits.toLocaleString()}</strong> total
                  visits
                </div>
                <div>
                  <strong>{stats.uniqueVisitors.toLocaleString()}</strong>{" "}
                  unique visitors
                </div>
                <div>
                  <strong>{stats.byCountry.length}</strong> countries
                </div>
                <div>
                  <strong>{stats.points.length}</strong> pinned locations
                </div>
              </div>

              <p className="vt-hint">
                Scroll to zoom · drag to pan · hover a pin for details
              </p>

              <VisitorMap points={stats.points} interactive />

              <div className="vt-modal-cols">
                <div className="vt-modal-col">
                  {stats.byCounty?.length > 0 && (
                    <>
                      <p className="vt-section-label">Top counties / districts</p>
                      <ul className="vt-recent-list vt-county-list">
                        {stats.byCounty.map((c) => (
                          <li key={c.county} className="vt-recent-row">
                            <span className="vt-recent-location">
                              {c.county}
                            </span>
                            <span className="vt-recent-sub">
                              {[c.region, c.country].filter(Boolean).join(", ")}
                            </span>
                            <span className="vt-count">{c.count}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  <p className="vt-section-label">Top countries</p>
                  <ul className="vt-country-list">
                    {stats.byCountry.map((c) => (
                      <li key={c.country} className="vt-country-row">
                        <span className="vt-flag">
                          {toFlagEmoji(c.country_code)}
                        </span>
                        <span className="vt-country-name">{c.country}</span>
                        <div className="vt-bar-wrap">
                          <div
                            className="vt-bar"
                            style={{ width: `${(c.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="vt-count">{c.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="vt-modal-col">
                  <p className="vt-section-label">Recent visitors</p>
                  <ul className="vt-recent-list">
                    {stats.recentVisits.map((v, i) => (
                      <li
                        key={i}
                        className="vt-recent-row vt-recent-row-detail"
                        title={fullDetail(v)}
                      >
                        <span className="vt-flag">
                          {toFlagEmoji(v.country_code)}
                        </span>
                        <span className="vt-recent-stack">
                          <span className="vt-recent-location">
                            {labelFor(v)}
                          </span>
                          {v.county && (
                            <span className="vt-recent-sub">{v.county}</span>
                          )}
                        </span>
                        <span className="vt-recent-stack vt-right">
                          <span className="vt-recent-time">
                            {timeAgo(v.visited_at)}
                          </span>
                          <span className="vt-recent-sub">
                            {new Date(v.visited_at).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default VisitorTracker;
