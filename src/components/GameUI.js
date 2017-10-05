import React from "react";
import { rules } from "../shared/helpers.js";

export default class GameUI extends React.PureComponent {
  render() {
    const { turn } = this.props;

    return (
      <div className="gameUI">
        <div className="turnBar">
          <div
            className="turnBarFill"
            style={{
              animationDuration: rules.secondsPerTurn + "s",
            }}
          />
        </div>
        <div className="turnUI text-shadow">{turn}</div>
      </div>
    );
  }
}
