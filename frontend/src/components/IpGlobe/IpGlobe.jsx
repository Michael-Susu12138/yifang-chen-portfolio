import React, { useEffect, useRef } from "react";

const IpGlobe = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "mapmyvisitors";
    script.src =
      "//mapmyvisitors.com/map.js?d=YFARqzCfiVVu7h0gcLRGhJA8Pl5n071564oDENhL8O4&cl=ffffff&w=a";

    container.appendChild(script);

    return () => {
      if (container.contains(script)) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <div ref={containerRef}></div>
  );
};

export default IpGlobe;
