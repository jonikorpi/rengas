import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

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
        {x},{y}
      </div>
    );
  }
}
