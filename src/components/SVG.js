import React from "react";

import { config } from "../graphics.js";

const tileWidth = config.tileSize * config.tileCanvasMultiplier;
const viewBox = `-${tileWidth / 2} -${tileWidth / 2} ${tileWidth} ${tileWidth}`;

const SVG = ({ children, z, zIndex, scale, className }) => {
  return (
    <div
      className={`svgContainer ${className ? className : ""}`}
      style={{
        "--z": z || 0,
        "--tileCanvasMultiplier": config.tileCanvasMultiplier,
        "--scale": scale || 0,
        zIndex: zIndex || z || 0,
      }}
    >
      <svg
        className="svg"
        shapeRendering="optimizeSpeed"
        preserveAspectRatio="none"
        viewBox={viewBox}
      >
        {children}
      </svg>
    </div>
  );
};

export default SVG;
