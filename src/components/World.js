import React from "react";
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
      }}
    >
      <div className="worldSizer">{children}</div>

      <div className="worldShadow" />
    </div>
  );
};

export default World;
