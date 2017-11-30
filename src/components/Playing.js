import React from "react";
import { connect } from "react-firebase";

import Vision from "./Vision";
import PlayerUI from "./PlayerUI";
import LogoUI from "./LogoUI";

class Playing extends React.Component {
  randomSpawn = () => {};

  render() {
    const { vision, stats, userID, isDevelopment } = this.props;

    return [
      <PlayerUI
        key="PlayerUI"
        stats={stats}
        userID={userID}
        isDevelopment={isDevelopment}
      />,
      <LogoUI key="LogoUI" userID={userID} isDevelopment={isDevelopment} />,
      <Vision
        key="Vision"
        vision={vision}
        userID={userID}
        isDevelopment={isDevelopment}
      />,
    ];
  }
}

export default connect((props, ref) => ({
  vision: `players/${props.userID}/session/vision`,
  stats: `players/${props.userID}/session/stats`,
}))(Playing);
