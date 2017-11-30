import React from "react";
import { connect } from "react-firebase";
import Loadable from "react-loadable";

import Loader from "./Loader";
import LogMessage from "./LogMessage";

const Spawning = Loadable({
  loader: () => import("./Spawning"),
  loading: Loader,
});
const Playing = Loadable({
  loader: () => import("./Playing"),
  loading: Loader,
});
const PlayerProxy = Loadable({
  loader: () => import("./PlayerProxy"),
  loading: Loader,
});

const refreshPage = () => {
  window.location.reload();
};

class PlayState extends React.Component {
  render() {
    const { playState, online /*isDevelopment*/ } = this.props;

    let keys = 0;

    return [
      playState === null && <Spawning key={keys++} {...this.props} />,
      playState === "playing" && <Playing key={keys++} {...this.props} />,
      /*&& isDevelopment &&*/ <PlayerProxy key={keys++} {...this.props} />,
      online &&
        playState === undefined && (
          <LogMessage key={keys++}>Downloading player data…</LogMessage>
        ),
      !online && (
        <LogMessage key={keys++}>
          Offline. Connecting to database…{" "}
          <button
            type="button"
            className="buttonWithDelayedReveal"
            onClick={refreshPage}
          >
            Turn it off and on again
          </button>
        </LogMessage>
      ),
    ];
  }
}

export default connect((props, ref) => ({
  playState: `players/${props.userID}/session/playState`,
  online: ".info/connected",
}))(PlayState);
