import React from "react";

import Area from "./Area";
import {
  // rules,
  getFreshArea,
  addPlayerToArea,
  singlePlayerUserID,
} from "../shared/helpers.js";

export default class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: {},
      gameState: addPlayerToArea(
        {
          playerID: singlePlayerUserID,
          startingX: 4,
        },
        getFreshArea(Date.now())
      ),
    };
  }

  render() {
    const { gameState, commands } = this.state;
    const { visibleTiles } = gameState.players[singlePlayerUserID];

    return (
      <Area
        {...this.props}
        gameState={this.state.gameState}
        visibleTiles={visibleTiles}
        commands={commands}
      />
    );
  }
}
