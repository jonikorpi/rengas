import React from "react";
import { connect } from "react-firebase";

import Vision from "./Vision";
import PlayerUI from "./PlayerUI";
import LogoUI from "./LogoUI";

class Playing extends React.Component {
  randomSpawn = () => {};

  render() {
    const { vision, stats } = this.props;

    return [
      <Vision key="Vision" vision={vision} />,
      <PlayerUI key="PlayerUI" stats={stats} />,
      <LogoUI key="LogoUI" />,
    ];
  }
}

export default connect((props, ref) => ({
  vision: `players/${props.userID}/session/vision`,
  stats: `players/${props.userID}/session/stats`,
}))(Playing);
