import React, { PureComponent } from "react";

import TileType from "./TileType";
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
    const { x, y, worldLength, type } = this.props;

    return (
      <div
        className={`tile ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        <TileType type={type} baseTile={this.baseTile} seed={this.seed} />

        <div className="debug">{JSON.stringify(this.props, false, 2)}</div>
      </div>
    );
  }
}
