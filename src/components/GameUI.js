import React, { PureComponent } from "react";

export default class GameUI extends PureComponent {
  render() {
    return "Turn " + this.props.turn;
  }
}
