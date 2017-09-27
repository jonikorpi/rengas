import React, { PureComponent } from "react";

import SVG from "./SVG";
import { rules } from "../shared/helpers.js";
import { config, baseTile } from "../graphics.js";

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
        <SVG>
          <polygon
            points={baseTile({ x: x, y: y })
              .join(" ")
              .toString()}
            fill="black"
          />
        </SVG>

        <div className="debug">{JSON.stringify(this.props, false, 2)}</div>
      </div>
    );
  }
}
