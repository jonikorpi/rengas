import React, { Component } from "react";
import Tile from "./Tile";
import Unit from "./Unit";

export default class Vision extends Component {
  render() {
    const { tiles, units } = this.props;

    return [
      tiles &&
        tiles.map(tile => (
          <Tile key={`${tile.x},${tile.y}`} x={tile.x} y={tile.y} {...tile} />
        )),
      units &&
        units.map(
          unit =>
            unit ? (
              <Unit
                key={`${unit.x},${unit.y}`}
                x={unit.x}
                y={unit.y}
                {...unit}
              />
            ) : null
        ),
    ];
  }
}
