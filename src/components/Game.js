import React from "react";
import { connect } from "react-firebase";
import firebase from "firebase/app";
import "firebase/database";
import Loadable from "react-loadable";

import Session from "./Session";
import Loader from "./Loader";

const WorldProxy = Loadable({
  loader: () => import("./WorldProxy"),
  loading: Loader,
});

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
    const { startedAt, userID } = this.props;

    return [
      <WorldProxy
        key="WorldProxy"
        startedAt={startedAt || null}
        userID={userID}
      />,
      startedAt && (
        <Session
          key="Session"
          {...this.props}
          {...this.state}
          spawn={this.spawn}
          concede={this.concede}
        />
      ),
      startedAt && (
        <button key="Concede" onClick={this.concede}>
          Concede
        </button>
      ),
      !startedAt && (
        <button key="Spawn" onClick={this.spawn}>
          Spawn
        </button>
      ),
    ];
  }
}

export default connect((props, ref) => ({
  startedAt: `world/${props.userID}`,
}))(Game);
