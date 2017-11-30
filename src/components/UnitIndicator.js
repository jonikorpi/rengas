import React from "react";

const UnitIndicator = ({ x, y }) => (
  <div
    className="unitIndicator"
    style={{
      "--x": x,
      "--y": y,
    }}
  >
    ?
  </div>
);

export default UnitIndicator;
