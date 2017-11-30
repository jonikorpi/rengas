import React from "react";
import { connect } from "react-firebase";

import Tile from "./Tile";
import UnitIndicator from "./UnitIndicator";
import LocationUI from "./LocationUI";

import { compose } from "../shared/helpers.js";
import { nullTile } from "../shared/tiles.js";

class LocationDataFetcher extends React.PureComponent {
  render() {
    const {
      tile,
      unitExists,
      unit,
      shoreVisible,
      trueSight,
      userID,
      ...commonProps
    } = this.props;
    const actualTile = tile || nullTile;
    let keys = 0;

    return [
      <Tile
        key={keys++}
        tile={actualTile}
        shoreVisible={shoreVisible}
        {...commonProps}
      />,
      unitExists && <UnitIndicator key={keys++} {...commonProps} />,
      <LocationUI
        key={keys++}
        tile={actualTile}
        unit={unit}
        unitExists={unitExists}
        userID={userID}
        {...commonProps}
      />,
    ];
  }
}

export default compose(
  connect((props, ref) => {
    const { x, y, trueSight } = props;
    const locationID = `${x},${y}`;

    return {
      tile: `locations/${locationID}/tile`,
      unitExists: !trueSight
        ? `locations/${locationID}/unit/exists`
        : undefined,
      unitID: trueSight ? `locations/${locationID}/unit/ID` : undefined,
    };
  }),
  connect((props, ref) => {
    const { unitID } = props;

    return {
      unit: unitID ? `units/${unitID}` : undefined,
    };
  })
)(LocationDataFetcher);
