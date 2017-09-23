import React, { Component } from "react";
import World from "./World";
import GameUI from "./GameUI";
import PlayerUI from "./PlayerUI";
import Vision from "./Vision";
import Memory from "./Memory";
import { rules } from "../shared/games.js";

const calculateTurn = startedAt => {
  return (Date.now() - startedAt) / rules.secondsPerTurn / 1000;
};

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
    const currentTurn = Math.floor(calculateTurn(this.props.startedAt));

    if (currentTurn !== this.state.turn) {
      this.setState({
        turn: currentTurn,
      });
    }
  };

  render() {
    const { turn } = this.state;
    const { playerCount, player, startedAt } = this.props;
    const { lastMana, lastCommand, reserveMana } = player;

    const worldLength = Math.max(
      playerCount * rules.plateLength - Math.floor(turn),
      rules.minimumPlateLength * playerCount
    );

    const exactTurn = calculateTurn(startedAt);

    return [
      <World key="World" worldLength={worldLength}>
        <Vision turn={turn} worldLength={worldLength} {...this.props} />
        <Memory turn={turn} worldLength={worldLength} {...this.props} />
      </World>,
      <GameUI key="GameUI" turn={turn} exactTurn={exactTurn} />,
      <PlayerUI
        key="PlayerUI"
        exactTurn={exactTurn}
        turn={turn}
        lastMana={lastMana}
        lastCommand={lastCommand}
        reserveMana={reserveMana}
      />,
    ];
  }
}
