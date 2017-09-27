import React from "react";

const SVG = ({ children, z }) => {
  return (
    <svg
      className="svg"
      shapeRendering="optimizeSpeed"
      preserveAspectRatio="none"
      viewBox="-256 -256 256 256"
      style={{
        "--z": z || 0,
      }}
    >
      {children}
    </svg>
  );
};

export default SVG;
