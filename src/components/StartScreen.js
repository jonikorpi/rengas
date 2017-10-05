import React from "react";

export default class StartScreen extends React.Component {
  render() {
    const { changeGameType, online } = this.props;

    return (
      <div>
        <button
          onClick={() => {
            changeGameType("singlePlayer");
          }}
        >
          Play solo
        </button>

        <button
          disabled={!online}
          onClick={() => {
            changeGameType("multiPlayer");
          }}
        >
          Auto-join a multi-player game
        </button>
      </div>
    );
  }
}
