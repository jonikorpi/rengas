import React from "react";
import Clock from "./Clock";

export default class MultiPlayer extends React.Component {
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
