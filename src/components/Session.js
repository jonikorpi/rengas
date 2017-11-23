import React from "react";
import GameUI from "./GameUI";
import PlayerUI from "./PlayerUI";
import LogoUI from "./LogoUI";
import { rules } from "../shared/helpers.js";

const calculateTurn = (when = Date.now()) => {
  return Math.floor(Math.max(0, when / rules.secondsPerTurn / 1000));
};

export default class Session extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turn: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshTurn, 6 * 1000 / 60);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  refreshTurn = () => {
    const currentTurn = Math.floor(calculateTurn());

    if (currentTurn !== this.state.turn) {
      this.setState({
        turn: currentTurn,
      });
    }
  };

  render() {
    const { turn } = this.state;
    const { startedAt, areaLength, mana, lastUsedManaAt } = this.props;

    return [
      // <Locations key="Locations" areaLength={areaLength}>
      //   <Vision turn={turn} areaLength={areaLength} {...this.props} />
      // </Locations>,
      <GameUI key="GameUI" turn={turn} startedAt={startedAt} />,
      <PlayerUI
        key="PlayerUI"
        mana={
          calculateTurn(startedAt, lastUsedManaAt) === turn
            ? mana
            : rules.maxMana
        }
      />,
      <LogoUI key="LogoUI" {...this.props} />,
    ];
  }
}
