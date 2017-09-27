import React, { PureComponent } from "react";
import { rules } from "../shared/helpers.js";

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
        <div className="debug">{JSON.stringify(this.props, false, 2)}</div>
      </div>
    );
  }
}
