import React from "react";
import { connect } from "react-firebase";

import Tooltip from "./Tooltip";
import { compose } from "../shared/helpers.js";
import { nullTile } from "../shared/tiles.js";

class LocationDataFetcher extends React.PureComponent {
  render() {
    return <Tooltip {...this.props} tile={this.props.tile || nullTile} />;
  }
}

export default compose(
  connect((props, ref) => {
    const { unitID, x, y, trueSight } = props;
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
