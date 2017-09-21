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
    return (
      <Clock
        {...this.state}
        {...this.props}
        player={this.state.gameState.players[singlePlayerUserID]}
        startedAt={this.state.gameState.details.startedAt}
        playerCount={this.state.gameState.details.playerCount}
        userID={singlePlayerUserID}
      />
    );
  }
}
