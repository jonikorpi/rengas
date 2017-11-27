import React from "react";
import { connect } from "react-firebase";
import firebase from "firebase/app";
import "firebase/database";

class Spawning extends React.Component {
  randomSpawn = () => {
    firebase
      .database()
      .ref(`players/${this.props.userID}/command`)
      .set({ action: "spawn", ID: Math.random() });
  };

  render() {
    const { command } = this.props;

    return [
      command && "Spawning…",
      command === null && (
        <button key="RandomSpawn" type="button" onClick={this.randomSpawn}>
          Random spawn
        </button>
      ),
      command === undefined && "Checking spawn status…",
    ];
  }
}

export default connect((props, ref) => ({
  command: `players/${props.userID}/command`,
  lifetime: `players/${props.userID}/lifetime`,
}))(Spawning);
