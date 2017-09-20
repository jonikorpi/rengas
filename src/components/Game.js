import React, { Component } from "react";
import LogoUI from "./LogoUI";
import StartScreen from "./StartScreen";
import SinglePlayer from "./SinglePlayer";
import MultiPlayer from "./MultiPlayer";

export default class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameType: null,
      joinedGames: null,
    };
  }

  changeGameType = gameType => {
    this.setState({ gameType: gameType });
  };

  getModeComponent = gameType => {
    switch (gameType) {
      case "singlePlayer":
        return <SinglePlayer {...this.props} />;
      case "multiPlayer":
        return <MultiPlayer {...this.props} />;
      default:
        return (
          <StartScreen changeGameType={this.changeGameType} {...this.props} />
        );
    }
  };

  render() {
    const { gameType } = this.state;

    return (
      <div className="game">
        <LogoUI
          gameType={gameType}
          changeGameType={this.changeGameType}
          {...this.props}
        />

        {this.getModeComponent(gameType)}
      </div>
    );
  }
}
