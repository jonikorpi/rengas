import React from "react";

import Tile from "./Tile";
import UnitIndicator from "./UnitIndicator";

export default class Location extends React.PureComponent {
  render() {
    const { trueSight } = this.props;

    return [
      <Tile key="Tile" {...this.props} />,
      !trueSight && <UnitIndicator key="UnitIndicator" {...this.props} />,
    ];
  }
}
