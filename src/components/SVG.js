import React from "react";

import { config } from "../graphics.js";

const tileWidth = config.tileSize * config.tileCanvasMultiplier;
const viewBox = `-${tileWidth / 2} -${tileWidth / 2} ${tileWidth} ${tileWidth}`;

const SVG = ({ children, z, zIndex, style, className }) => {
  return (
    <svg
      className={"svg " + className}
      shapeRendering="optimizeSpeed"
      preserveAspectRatio="none"
      viewBox={viewBox}
      style={{
        "--z": z || 0,
        zIndex: zIndex || z || 0,
        ...style,
      }}
    >
      {children}
    </svg>
  );
};

export default SVG;
