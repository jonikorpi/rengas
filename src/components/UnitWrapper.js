import React from "react";

import Unit from "./Unit";

export default class UnitWrapper extends React.PureComponent {
  render() {
    return <Unit {...this.props} />;
  }
}
