import React from "react";

import Tile from "./Tile";
import UnitIndicator from "./UnitIndicator";
import LocationUI from "./LocationUI";

export default class Location extends React.PureComponent {
  render() {
    const { x, y, userID, trueSight } = this.props;

    let keys = 0;

    return [
      <Tile key={keys++} {...this.props} />,
      !trueSight && <UnitIndicator key={keys++} {...this.props} />,
      <LocationUI
        key={keys++}
        x={x}
        y={y}
        trueSight={trueSight}
        userID={userID}
      />,
    ];
  }
}
