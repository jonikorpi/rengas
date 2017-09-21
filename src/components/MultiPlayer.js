import React, { Component } from "react";
import Clock from "./Clock";

export default class MultiPlayer extends Component {
  render() {
    return (
      <Clock
        {...this.props}
        // tiles={tiles}
        // units={units}
        // commands={this.state.commands}
        // startedAt={gameState.details.startedAt}
        // playerCount={gameState.details.playerCount}
      />
    );
  }
}
