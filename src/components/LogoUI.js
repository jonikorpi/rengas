import React from "react";

export default class LogoUI extends React.Component {
  render() {
    const { gameType, changeGameType, online } = this.props;

    return (
      <div className="logoUI safeAreaMargins">
        {!online && "Offline"}
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
