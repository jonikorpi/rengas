import React from "react";
import firebase from "firebase/app";
import "firebase/database";

import Firebase from "./Firebase";
import LogMessage from "./LogMessage";

export default class WaypointUI extends React.Component {
  randomSpawn = () => {
    firebase
      .database()
      .ref(`players/${this.props.userID}/commands`)
      .push({ action: "spawn", time: Date.now(), processed: false });
  };

  render() {
    const { userID } = this.props;

    return (
      <Firebase
        query={{
          session: `players/${userID}/session`,
        }}
      >
        {({ session }) => (
          <LogMessage>
            <button type="button" onClick={this.randomSpawn}>
              Random spawn
            </button>
          </LogMessage>
        )}
      </Firebase>
    );

    // return [
    //   action === "spawn" && <LogMessage key={keys++}>Spawning…</LogMessage>,
    //   command !== undefined &&
    //     action !== "spawn" && (
    //       <button key={keys++} type="button" onClick={this.randomSpawn}>
    //         Random spawn
    //       </button>
    //     ),
    // ];
  }
}
