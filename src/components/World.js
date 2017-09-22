import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class World extends PureComponent {
  render() {
    return (
      <div
        className="world"
        style={{
          "--tileSize": 100 / rules.worldWidth,
          "--worldLength": this.props.worldLength,
          "--worldWidth": rules.worldWidth,
          "--plateLength": rules.plateLength,
          "--minimumPlateLength": rules.minimumPlateLength,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
