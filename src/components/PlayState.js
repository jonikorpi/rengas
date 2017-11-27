import React from "react";
import { connect } from "react-firebase";
import Loadable from "react-loadable";

import Loader from "./Loader";

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

class PlayState extends React.Component {
  render() {
    const { playState, isDevelopment } = this.props;

    return [
      playState === null && <Spawning key="Spawning" {...this.props} />,
      playState === "playing" && <Playing key="Playing" {...this.props} />,
      /*&& isDevelopment &&*/ <PlayerProxy key="PlayerProxy" {...this.props} />,
      playState === undefined && "Connecting to database…",
    ];
  }
}

export default connect((props, ref) => ({
  playState: `players/${props.userID}/session/playState`,
  online: ".info/connected",
}))(PlayState);
