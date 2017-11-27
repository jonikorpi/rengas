import React from "react";

export default class LogoUI extends React.PureComponent {
  render() {
    const { gameType, changeGameType } = this.props;

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
