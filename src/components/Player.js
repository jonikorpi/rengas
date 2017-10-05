import React from "react";

import StartScreen from "./StartScreen";
import SinglePlayer from "./SinglePlayer";
import MultiPlayer from "./MultiPlayer";

export default class Player extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player: undefined,
    };
  }

  getModeComponent = (gameType, props, state) => {
    switch (gameType) {
      case "singlePlayer":
        return <SinglePlayer key="SinglePlayer" {...state} {...props} />;
      case "multiPlayer":
        return <MultiPlayer key="MultiPlayer" {...state} {...props} />;
      default:
        return <StartScreen key="StartScreen" {...state} {...props} />;
    }
  };

  render() {
    const { gameType } = this.props;

    return this.getModeComponent(gameType, this.props, this.state);
  }
}
