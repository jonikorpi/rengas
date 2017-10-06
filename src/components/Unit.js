import React from "react";

import { hexToCoordinates } from "../hexes.js";

export default class Unit extends React.PureComponent {
  render() {
    const { x, y, areaLength, unitID } = this.props;
    const coordinates = hexToCoordinates({ x, y });

    return (
      <div
        id={unitID}
        className={`unit ${y > areaLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": coordinates.x,
          "--y": coordinates.y,
        }}
      >
        U
      </div>
    );
  }
}
