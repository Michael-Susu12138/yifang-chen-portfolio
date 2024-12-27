import React, { useEffect } from "react";

const IpGlobe = () => {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "clstr_globe";
    script.src =
      "//clustrmaps.com/globe.js?d=MqSYHDjXgz0lKFdRxdOv4y4hnl1U8Ox1H8A-tf-ggEY";

    // Append the script to the body
    document.body.appendChild(script);

    // Cleanup script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Placeholder for the globe */}
      <div id="clustrmaps-globe-placeholder"></div>
    </div>
  );
};

export default IpGlobe;
