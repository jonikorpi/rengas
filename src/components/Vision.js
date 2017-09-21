import React, { Component } from "react";
import Tile from "./Tile";
import Unit from "./Unit";

export default class Vision extends Component {
  render() {
    const { canSee } = this.props.player;
    const { world } = this.props.gameState;

    return Object.keys(canSee).map(x => {
      return Object.keys(canSee[x]).map(y => {
        return (
          <Tile
            key={`${x},${y}`}
            {...this.props}
            x={x}
            y={y}
            {...world[x][y].tile}
          />
        );
      });
    });
  }
}
