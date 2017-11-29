import React from "react";

import { rules } from "../shared/helpers.js";

const Tooltip = ({ x, trueSight, unitExists, unitID, unit, tile }) => {
  return (
    <div
      className="tooltip"
      role="tooltip"
      style={{ [x < rules.worldWidth / 2 ? "left" : "right"]: "100%" }}
    >
      <h1>{tile.type}</h1>
      {unit && <h1>{unit.type}</h1>}
      {unit && <p>Owned by {unit.owner}</p>}
      {!trueSight && unitExists && <p>There’s something here.</p>}
    </div>
  );
};

export default Tooltip;
