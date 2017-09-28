import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config, baseTile, getSeed } from "../graphics.js";

const Shroud = ({ x, y, worldLength }) => {
  let seed = getSeed(x, y);
  const points = baseTile(seed++)
    .join(" ")
    .toString();

  return (
    <div
      className={`shroud ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
      style={{
        "--x": x,
        "--y": y,
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
