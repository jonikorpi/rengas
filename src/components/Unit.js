import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class Unit extends PureComponent {
  render() {
    const { x, y, worldLength, unitID } = this.props;

    return (
      <div
        className={`unit ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        {unitID}
      </div>
    );
  }
}
