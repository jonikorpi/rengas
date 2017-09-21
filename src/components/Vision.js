import React, { Component } from "react";
import Tile from "./Tile";
import Unit from "./Unit";

export default class Vision extends Component {
  render() {
    const { tiles, units } = this.props;

    return [
      tiles.map(tile => (
        <Tile
          key={`${tile.x},${tile.y}`}
          {...this.props}
          x={tile.x}
          y={tile.y}
          {...tile}
        />
      )),
      units.map(
        unit =>
          unit ? (
            <Unit
              key={`${unit.x},${unit.y}`}
              {...this.props}
              x={unit.x}
              y={unit.y}
              {...unit}
            />
          ) : null
      ),
    ];
  }
}
