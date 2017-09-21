import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class Unit extends PureComponent {
  render() {
    const { x, y, worldLength, unitID } = this.props;

    return (
      <div
        className={`unit ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          transform: `translate3d(${100 / rules.worldWidth * x}vw, ${100 /
            rules.worldWidth *
            y}vw, 0)`,
          width: `${100 / rules.worldWidth}vw`,
          height: `${100 / rules.worldWidth}vw`,
        }}
      >
        {unitID}
      </div>
    );
  }
}
