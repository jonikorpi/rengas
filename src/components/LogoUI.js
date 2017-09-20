import React, { Component } from "react";

export default class LogoUI extends Component {
  render() {
    const { gameType, changeGameType, online } = this.props;

    return (
      <div className="logoUI">
        {online ? "Online" : "Offline"}

        {gameType && (
          <button
            onClick={() => {
              changeGameType(null);
            }}
          >
            Quit game
          </button>
        )}
      </div>
    );
  }
}
