import React, { PureComponent } from "react";
import { rules } from "../shared/helpers.js";

export default class Tile extends PureComponent {
  render() {
    const { x, y, worldLength } = this.props;

    return (
      <div
        className={`tile ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
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
