import React, { Component } from "react";
import Clock from "./Clock";

export default class SinglePlayer extends Component {
  render() {
    return (
      <Clock startedAt={Date.now()}>
        <p>Single-player</p>
      </Clock>
    );
  }
}
