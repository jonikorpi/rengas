import React, { Component } from "react";
import GameUI from "./GameUI";
import PlayerUI from "./PlayerUI";
import Vision from "./Vision";
import Memory from "./Memory";

const secondsPerTurn = 10;

export default class Clock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshTurn, 10 * 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refreshTurn = () => {
    const currentTurn = Math.floor(
      (Date.now() - this.props.startedAt) / secondsPerTurn / 1000
    );

    if (currentTurn !== this.state.turn) {
      this.setState({
        turn: currentTurn,
      });
    }
  };

  render() {
    const { turn } = this.state;

    return [
      <GameUI key={"GameUI"} turn={turn} {...this.props} />,
      <PlayerUI key={"PlayerUI"} turn={turn} {...this.props} />,
      <Vision key={"Vision"} turn={turn} {...this.props} />,
      <Memory key={"Memory"} turn={turn} {...this.props} />,
    ];
  }
}
