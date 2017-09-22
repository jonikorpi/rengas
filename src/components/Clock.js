import React, { Component } from "react";
import World from "./World";
import GameUI from "./GameUI";
import PlayerUI from "./PlayerUI";
import Vision from "./Vision";
import Memory from "./Memory";
import { rules } from "../shared/games.js";

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
      (Date.now() - this.props.startedAt) / rules.secondsPerTurn / 1000
    );

    if (currentTurn !== this.state.turn) {
      this.setState({
        turn: currentTurn,
      });
    }
  };

  render() {
    const { turn } = this.state;
    const { playerCount } = this.props;
    const worldLength = Math.max(
      playerCount * rules.plateLength - Math.floor(turn),
      rules.minimumPlateLength * playerCount
    );

    return [
      <GameUI key="GameUI" turn={turn} {...this.props} />,
      <PlayerUI key="PlayerUI" turn={turn} {...this.props} />,
      <World key="World" worldLength={worldLength}>
        <Vision turn={turn} worldLength={worldLength} {...this.props} />
        <Memory turn={turn} worldLength={worldLength} {...this.props} />
      </World>,
    ];
  }
}
