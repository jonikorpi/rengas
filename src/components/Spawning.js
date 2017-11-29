import React from "react";
import { connect } from "react-firebase";
import firebase from "firebase/app";
import "firebase/database";

import LogMessage from "./LogMessage";

class Spawning extends React.Component {
  randomSpawn = () => {
    firebase
      .database()
      .ref(`players/${this.props.userID}/command`)
      .set({ action: "spawn", ID: Math.random() });
  };

  render() {
    const { command } = this.props;

    const action = (command && command.action) || undefined;

    let keys = 0;

    return [
      action === "spawn" && <LogMessage key={keys++}>Spawning…</LogMessage>,
      command !== undefined &&
        action !== "spawn" && (
          <button key={keys++} type="button" onClick={this.randomSpawn}>
            Random spawn
          </button>
        ),
      command === undefined && (
        <LogMessage key={keys++}>Checking spawn status…</LogMessage>
      ),
    ];
  }
}

export default connect((props, ref) => ({
  command: `players/${props.userID}/command`,
  lifetime: `players/${props.userID}/lifetime`,
}))(Spawning);
