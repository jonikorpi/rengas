import React, { PureComponent } from "react";

export default class Unit extends PureComponent {
  render() {
    return <pre>{JSON.stringify(this.props, null, 2)}</pre>;
  }
}
