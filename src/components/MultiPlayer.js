import React, { Component } from "react";
import Clock from "./Clock";

export default class MultiPlayer extends Component {
  render() {
    return (
      <Clock startedAt={Date.now()}>
        <p>Multi-player</p>
      </Clock>
    );
  }
}
