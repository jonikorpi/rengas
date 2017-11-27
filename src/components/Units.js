import React from "react";
import { connect } from "react-firebase";

import UnitWrapper from "./UnitWrapper";

class Units extends React.PureComponent {
  render() {
    const { unitIDs, userID } = this.props;
    const locationList = unitIDs && Object.keys(unitIDs);

    return (
      <div className="units">
        {locationList.length > 0
          ? locationList.map(locationID => (
              <UnitWrapper
                key={unitIDs[locationID]}
                userID={userID}
                unitID={unitIDs[locationID]}
              />
            ))
          : null}
      </div>
    );
  }
}

export default connect(
  (props, ref) => {
    const { vision } = props;

    return vision
      ? Object.keys(vision).reduce((mapping, locationID) => {
          mapping[locationID] = `locations/${locationID}/unit/ID`;
          return mapping;
        }, {})
      : {};
  },
  (ownProps, firebaseProps) => ({
    ...ownProps,
    unitIDs: firebaseProps,
  })
)(Units);
