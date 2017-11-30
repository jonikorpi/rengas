import React from "react";

import { rules } from "../shared/helpers.js";

const Tooltip = ({ x, y, trueSight, unitExists, unitID, unit, tile }) => {
  const leftAligned = x < rules.worldWidth / 2;

  return (
    <div
      className="tooltip"
      role="tooltip"
      style={{
        [leftAligned ? "left" : "right"]: "100%",
        textAlign: !leftAligned && "right",
      }}
    >
      <h1>{tile.type}</h1>
      <p>
        {x},{y}
      </p>
      {unit && <h1>{unit.type}</h1>}
      {unit && <p>Owned by {unit.owner}</p>}
      {unitExists && <p>There’s something here.</p>}
    </div>
  );
};

export default Tooltip;
