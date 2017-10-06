import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import TileType from "./TileType";
import { rules } from "../shared/helpers.js";
import { config, baseTile, getSeed, random } from "../graphics.js";
import { hexToCoordinates } from "../hexes.js";

export default class Tile extends React.PureComponent {
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
    const { x, y, areaLength, type, shoreVisible } = this.props;
    const onEdge = x === 0 ? -1 : x === rules.areaWidth - 1 ? 1 : null;
    const coordinates = hexToCoordinates({ x, y });

    return (
      <div
        className={`tile ${y > areaLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": coordinates.x,
          "--y": coordinates.y,
          "--random": this.random,
        }}
      >
        <TileType
          type={type}
          baseTile={this.baseTile}
          seed={this.seed}
          shoreVisible={shoreVisible}
        />

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
