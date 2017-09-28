import React, { Component } from "react";

import GameState from "./GameState";
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
    const { gameState, commands } = this.state;
    const { visibleTiles } = gameState.players[singlePlayerUserID];

    return (
      <GameState
        {...this.props}
        gameState={this.state.gameState}
        visibleTiles={visibleTiles}
        commands={commands}
      />
    );
  }
}
