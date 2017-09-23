import React, { PureComponent } from "react";

export default class GameUI extends PureComponent {
  render() {
    const { turn, exactTurn } = this.props;

    return (
      <div className="gameUI">
        Turn {turn} ({exactTurn})
      </div>
    );
  }
}
