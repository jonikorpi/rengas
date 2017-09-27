import React, { PureComponent } from "react";

import SVG from "./SVG";
import { rules } from "../shared/helpers.js";
import { config, baseTile, getSeed, random } from "../graphics.js";

export default class Tile extends PureComponent {
  constructor(props) {
    super(props);
    const { x, y } = props;

    this.seed = getSeed(x, y);
    this.baseTile = baseTile(this.seed++)
      .join(" ")
      .toString();
  }

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
        <SVG z={-3} zIndex={-4}>
          <polygon
            points={this.baseTile}
            fill="var(--white)"
            stroke="var(--white)"
            strokeWidth="1.5%"
            strokeLinejoin="round"
            strokeLinecap="round"
            transform="scale(1.146)"
          />
        </SVG>

        <SVG z={-3}>
          <polygon
            points={this.baseTile}
            fill="#333"
            transform="scale(1.146)"
          />
        </SVG>

        <SVG z={-2}>
          <polygon points={this.baseTile} fill="#666" transform="scale(1.09)" />
        </SVG>

        <SVG z={-1}>
          <polygon
            points={this.baseTile}
            fill="#999"
            transform="scale(1.056)"
          />
        </SVG>

        <SVG>
          <polygon points={this.baseTile} fill="#fff" />
        </SVG>

        <div className="debug">{JSON.stringify(this.props, false, 2)}</div>
      </div>
    );
  }
}
