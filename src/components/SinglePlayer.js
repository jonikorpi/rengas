import React, { Component } from "react";
import Clock from "./Clock";
import {
  rules,
  getFreshGameState,
  addPlayerToGameState,
  singlePlayerUserID,
} from "../shared/helpers.js";

export default class SinglePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: {},
      gameState: addPlayerToGameState(
        {
          playerID: singlePlayerUserID,
          startingX: Math.floor(Math.random() * rules.worldWidth),
        },
        getFreshGameState(Date.now())
      ),
    };
  }

  render() {
    const gameState = this.state.gameState;
    const { visibleTiles } = gameState.players[singlePlayerUserID];

    const tiles = Object.keys(visibleTiles)
      .reduce((tiles, x) => {
        return tiles.concat(
          Object.keys(visibleTiles[x]).map(y => {
            const tile = (gameState.world[x] &&
              gameState.world[x][y] &&
              gameState.world[x][y].tile) || {
                type: "water",
              };

            return {
              ...tile,
              x: +x,
              y: +y,
            };
          })
        );
      }, [])
      .filter(tile => tile.type);

    const units = Object.keys(visibleTiles)
      .reduce((units, x) => {
        return units.concat(
          Object.keys(visibleTiles[x]).map(y => {
            const unit =
              gameState.world[x] &&
              gameState.world[x][y] &&
              gameState.world[x][y].unit;

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
        player={gameState.players[singlePlayerUserID]}
        userID={singlePlayerUserID}
      />
    );
  }
}
