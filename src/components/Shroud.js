import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config, baseTile, getSeed } from "../graphics.js";

const Shroud = ({ x, y }) => {
  let seed = getSeed(x, y);
  const points = baseTile(seed++)
    .join(" ")
    .toString();

  return (
    <div
      className="shroud"
      style={{
        "--x": x,
        "--y": y,
      }}
    >
      <SVG z={config.waterLevel} zIndex={config.shroudLevel} scale={7}>
        <Graphic type="shroud" points={points} />
      </SVG>
    </div>
  );
};

export default Shroud;
