import React from "react";

import { config } from "../graphics.js";
import { rules } from "../shared/helpers.js";

const World = ({ children, worldLength }) => {
  return (
    <div
      className="world"
      style={{
        "--tileSize": 100 / rules.worldWidth,
        "--worldLength": worldLength,
        "--worldWidth": rules.worldWidth,
        "--plateLength": rules.plateLength,
        "--minimumPlateLength": rules.minimumPlateLength,
        "--waterLevel": config.waterLevel,
        "--groundLevel": config.groundLevel,
        "--shroudLevel": config.shroudLevel,
      }}
    >
      <div className="worldSizer">{children}</div>
    </div>
  );
};

export default World;
