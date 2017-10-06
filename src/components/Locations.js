import React from "react";

import { config } from "../graphics.js";
import { hexRatio } from "../hexes.js";
import { rules } from "../shared/helpers.js";

const Locations = ({ children, areaLength }) => {
  return (
    <div
      className="locations"
      style={{
        "--tileSize":
          100 / (rules.areaWidth + 0.5 / hexRatio / hexRatio) / hexRatio,
        "--areaLength": areaLength,
        "--areaWidth": rules.areaWidth,
        "--waterLevel": config.waterLevel,
        "--groundLevel": config.groundLevel,
        "--shroudLevel": config.shroudLevel,
      }}
    >
      <div className="locationSizer">{children}</div>
    </div>
  );
};

export default Locations;
