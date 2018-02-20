import React from "react";

import Firebase from "./Firebase";
import Vision from "./Vision";
import PlayerUI from "./PlayerUI";
import LogoUI from "./LogoUI";

export default class WorldUI extends React.Component {
  randomSpawn = () => {};

  render() {
    const { ownUnits, userID } = this.props;

    return (
      <React.Fragment>
        <PlayerUI key="PlayerUI" userID={userID} />
        <LogoUI key="LogoUI" userID={userID} />
        <Vision key="Vision" userID={userID} />
      </React.Fragment>
    );
  }
}
