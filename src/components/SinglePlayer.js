import React, { Component } from "react";
import Clock from "./Clock";
import { createFreshGameState, singlePlayerUserID } from "../shared/games.js";

export default class SinglePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: {},
      gameState: createFreshGameState([singlePlayerUserID]),
    };
  }

  render() {
    const gameState = this.state.gameState;
    const { canSee } = gameState.players[singlePlayerUserID];

    const tiles = Object.keys(canSee)
      .reduce((tiles, x) => {
        return tiles.concat(
          Object.keys(canSee[x]).map(y => {
            const tile = gameState.world[x] && gameState.world[x][y].tile;

            return {
              ...tile,
              x: +x,
              y: +y,
            };
          })
        );
      }, [])
      .filter(tile => tile.type);

    const units = Object.keys(canSee)
      .reduce((units, x) => {
        return units.concat(
          Object.keys(canSee[x]).map(y => {
            const unit = gameState.world[x] && gameState.world[x][y].unit;

            return {
              ...unit,
              x: +x,
              y: +y,
            };
          })
        );
      }, [])
      .filter(unit => unit.unitID);

    return (
      <Clock
        {...this.props}
        tiles={tiles}
        units={units}
        commands={this.state.commands}
        startedAt={gameState.details.startedAt}
        playerCount={gameState.details.playerCount}
        userID={singlePlayerUserID}
      />
    );
  }
}
