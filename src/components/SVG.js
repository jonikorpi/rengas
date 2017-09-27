import React from "react";

import { config } from "../graphics.js";

const tileWidth = config.tileSize * config.tileCanvasMultiplier;
const viewBox = `-${tileWidth / 2} -${tileWidth / 2} ${tileWidth} ${tileWidth}`;

const SVG = ({ children, z }) => {
  return (
    <svg
      className="svg"
      shapeRendering="optimizeSpeed"
      preserveAspectRatio="none"
      viewBox={viewBox}
      style={{
        "--z": z || 0,
      }}
    >
      {children}
    </svg>
  );
};

export default SVG;
