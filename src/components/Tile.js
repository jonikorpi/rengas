import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class Tile extends PureComponent {
  render() {
    const { x, y, worldLength } = this.props;

    return (
      <div
        className={`tile ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          left: `${100 / rules.worldWidth * x}vw`,
          width: `${100 / rules.worldWidth}vw`,
          top: `${100 / rules.worldWidth * y}vw`,
          height: `${100 / rules.worldWidth}vw`,
        }}
      >
        {x},{y}
      </div>
    );
  }
}
