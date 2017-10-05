import React from "react";

import LogoUI from "./LogoUI";
import Player from "./Player";

export default class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameType: "singlePlayer",
    };
  }

  changeGameType = gameType => {
    this.setState({ gameType: gameType });
  };

  render() {
    const { gameType } = this.state;

    return [
      <Player key="Player" gameType={gameType} {...this.props} />,
      <LogoUI
        key="LogoUI"
        gameType={gameType}
        changeGameType={this.changeGameType}
        {...this.props}
      />,
    ];
  }
}
