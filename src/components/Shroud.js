import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config, baseTile, getSeed } from "../graphics.js";
import { hexToCoordinates } from "../hexes.js";

const Shroud = ({ x, y, areaLength }) => {
  let seed = getSeed(x, y);
  const points = baseTile(seed++)
    .join(" ")
    .toString();
  const coordinates = hexToCoordinates({ x, y });

  return (
    <div
      className={`shroud ${y > areaLength / 2 ? "lower-half" : "upper-half"}`}
      style={{
        "--x": coordinates.x,
        "--y": coordinates.y,
      }}
    >
      <SVG z={config.groundLevel} zIndex={config.shroudLevel} scale={0}>
        <Graphic
          type="shroud"
          points={points}
          fill="var(--shroud)"
          strokeWidth="3%"
        />
      </SVG>
    </div>
  );
};

export default Shroud;
