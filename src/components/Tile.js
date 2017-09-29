import React, { PureComponent } from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
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
    this.random = random(1, this.seed++);
  }

  render() {
    const { x, y, worldLength, type } = this.props;
    const onEdge = x === 0 ? -1 : x === rules.worldWidth - 1 ? 1 : null;

    return (
      <div
        className={`tile ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": x,
          "--y": y,
          "--random": this.random,
        }}
      >
        <TileType type={type} baseTile={this.baseTile} seed={this.seed} />

        {onEdge && (
          <div className="wall" style={{ "--edgeDirection": onEdge }}>
            <SVG
              className="waterLine"
              z={config.groundLevel}
              scale={2}
              zIndex={config.waterLevel - 1}
            >
              <Graphic type="waterLine" points={this.baseTile} />
            </SVG>
            <SVG
              z={config.groundLevel}
              zIndex={config.groundLevel - 1}
              scale={0.5}
            >
              <Graphic
                type="wall"
                points={this.baseTile}
                fill="var(--wallShadowBelow)"
              />
            </SVG>
            <SVG
              z={config.groundLevel + 3}
              zIndex={config.shroudLevel - 2}
              scale={-2}
            >
              <Graphic
                type="wall"
                points={this.baseTile}
                fill="var(--wallShadow)"
              />
            </SVG>
            <SVG
              z={config.groundLevel + 5}
              zIndex={config.shroudLevel - 1}
              scale={-4}
            >
              <Graphic type="wall" points={this.baseTile} fill="var(--wall)" />
            </SVG>
          </div>
        )}
      </div>
    );
  }
}
