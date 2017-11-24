import React from "react";
import { connect } from "react-firebase";

import Island from "./Island";
import GameUI from "./GameUI";
import PlayerUI from "./PlayerUI";
import LogoUI from "./LogoUI";
import { rules } from "../shared/helpers.js";

const calculateTurn = (when = Date.now()) => {
  return Math.floor(Math.max(0, when / rules.secondsPerTurn / 1000));
};

class Session extends React.Component {
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
    const sessionData = this.props.session;
    const startedAt = sessionData.startedAt;
    const canSee = sessionData.canSee;

    const islands = Object.keys(canSee);

    return [
      <GameUI key="GameUI" turn={0} startedAt={startedAt} />,
      <PlayerUI
        key="PlayerUI"
        mana={
          0
          // calculateTurn(startedAt, lastUsedManaAt) === turn
          //   ? mana
          //   : rules.maxMana
        }
      />,
      <LogoUI key="LogoUI" {...this.props} />,
      islands && islands.map(island => <Island {...this.props} {...island} />),
    ];
  }
}

export default connect((props, ref) => ({
  session: `players/${props.userID}/session`,
}))(Session);
