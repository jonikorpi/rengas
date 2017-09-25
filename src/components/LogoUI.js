import React, { Component } from "react";

export default class LogoUI extends Component {
  render() {
    const { gameType, changeGameType, online } = this.props;

    return (
      <div className="logoUI safeAreaMargins">
        {gameType && (
          <button
            className="text-shadow"
            onClick={() => {
              changeGameType(null);
            }}
          >
            Quit
          </button>
        )}
      </div>
    );
  }
}
