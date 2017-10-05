import React from "react";
import Clock from "./Clock";

export default class MultiPlayer extends React.Component {
  render() {
    return <Clock {...this.props} />;
  }
}
