import React from "react";
import { connect } from "react-firebase";
import firebase from "firebase/app";
import "firebase/database";

import Session from "./Session";

class Game extends React.Component {
  spawn = () =>
    firebase
      .database()
      .ref(`world/${this.props.userID}`)
      .set(firebase.database.ServerValue.TIMESTAMP);

  concede = () =>
    firebase
      .database()
      .ref(`world/${this.props.userID}`)
      .remove();

  render() {
    return this.props.startedAt ? (
      [
        <Session
          key="Session"
          {...this.props}
          {...this.state}
          spawn={this.spawn}
          concede={this.concede}
        />,
        <button key="Concede" onClick={this.concede}>
          Concede
        </button>,
      ]
    ) : (
      <button onClick={this.spawn}>Spawn</button>
    );
  }
}

export default connect((props, ref) => ({
  startedAt: `world/${props.userID}`,
}))(Game);
