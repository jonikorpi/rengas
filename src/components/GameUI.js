import React, { PureComponent } from "react";

export default class GameUI extends PureComponent {
  render() {
    return <div className="gameUI">Turn {this.props.turn}</div>;
  }
}
