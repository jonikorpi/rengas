import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config, baseTile, getSeed, random } from "../graphics.js";

export default class Shroud extends React.PureComponent {
  constructor(props) {
    super(props);

    const { x, y } = props;

    this.seed = getSeed(x, y);
    this.baseTile = baseTile(this.seed++)
      .join(" ")
      .toString();
    // this.random = random(1, this.seed++);
  }

  render() {
    const { x, y } = this.props;

    return (
      <div
        className="shroud"
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        <SVG z={config.waterLevel} zIndex={config.shroudLevel} scale={7}>
          <Graphic type="shroud" points={this.baseTile} />
        </SVG>
      </div>
    );
  }
}
