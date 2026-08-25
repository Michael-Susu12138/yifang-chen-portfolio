import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";

const GEO_URL = "/world-110m.json";

// Pin radius grows with visit count but flattens out so one busy city
// does not swallow the whole map.
const radiusFor = (count) => 2.2 + Math.sqrt(Math.min(count, 100)) * 1.1;

/**
 * World map with a pin per visitor location.
 *
 * @param points     [{ lat, lon, city, region, country, count }]
 * @param interactive  enables pan/zoom + hover tooltips (used in the modal)
 */
const VisitorMap = ({ points = [], interactive = false }) => {
  const [tooltip, setTooltip] = useState(null);

  const handleEnter = (point, event) => {
    if (!interactive) return;
    const box = event.currentTarget.ownerSVGElement.getBoundingClientRect();
    setTooltip({
      point,
      x: event.clientX - box.left,
      y: event.clientY - box.top,
    });
  };

  const markers = points.map((p) => (
    <Marker key={`${p.lat},${p.lon}`} coordinates={[p.lon, p.lat]}>
      <circle
        r={radiusFor(p.count)}
        className="vt-pin-halo"
        onMouseEnter={(e) => handleEnter(p, e)}
        onMouseLeave={() => setTooltip(null)}
      />
      <circle r={radiusFor(p.count) * 0.45} className="vt-pin-core" />
    </Marker>
  ));

  const geographies = (
    <Geographies geography={GEO_URL}>
      {({ geographies: geos }) =>
        geos.map((geo) => (
          <Geography
            key={geo.rsmKey}
            geography={geo}
            className="vt-geo"
            tabIndex={-1}
          />
        ))
      }
    </Geographies>
  );

  return (
    <div className={`vt-map ${interactive ? "vt-map-interactive" : ""}`}>
      <ComposableMap
        projection="geoEqualEarth"
        width={800}
        height={400}
        projectionConfig={{ scale: 145 }}
        style={{ width: "100%", height: "auto" }}
      >
        {interactive ? (
          <ZoomableGroup center={[0, 0]} zoom={1} maxZoom={8}>
            {geographies}
            {markers}
          </ZoomableGroup>
        ) : (
          <>
            {geographies}
            {markers}
          </>
        )}
      </ComposableMap>

      {tooltip && (
        <div className="vt-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <strong>
            {[
              tooltip.point.neighbourhood ||
                tooltip.point.suburb ||
                tooltip.point.district,
              tooltip.point.city,
            ]
              .filter(Boolean)
              .join(", ") || "Unknown"}
          </strong>
          {tooltip.point.county && <span>{tooltip.point.county}</span>}
          <span>
            {[tooltip.point.region, tooltip.point.country]
              .filter(Boolean)
              .join(", ")}
            {tooltip.point.postcode ? ` · ${tooltip.point.postcode}` : ""}
          </span>
          <span className="vt-tooltip-count">
            {tooltip.point.count} visit{tooltip.point.count === 1 ? "" : "s"}
          </span>
        </div>
      )}
    </div>
  );
};

export default VisitorMap;
