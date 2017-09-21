import React, { PureComponent } from "react";
import { rules } from "../shared/games.js";

export default class World extends PureComponent {
  render() {
    return (
      <div
        className="world"
        style={{
          height: `${100 / rules.worldWidth * this.props.worldLength}vw`,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
