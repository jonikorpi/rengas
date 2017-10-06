import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config, baseTile, getSeed } from "../graphics.js";

const Shroud = ({ x, y, areaLength }) => {
  let seed = getSeed(x, y);
  const points = baseTile(seed++)
    .join(" ")
    .toString();

  return (
    <div
      className={`shroud ${y > areaLength / 2 ? "lower-half" : "upper-half"}`}
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
