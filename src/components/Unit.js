import React from "react";
import { connect } from "react-firebase";

import UnitUI from "./UnitUI";
import UnitProxy from "./UnitProxy";

class Unit extends React.Component {
  render() {
    const { unitID, unit, userID } = this.props;

    if (!unit) {
      return null;
    }

    const [x, y] = unit.location.split(",");
    const isOwnUnit = unit.owner === userID;

    return [
      <div
        key="unit"
        className="unit"
        id={unitID}
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        {unit && unit.type}
      </div>,
      isOwnUnit && <UnitUI key="UnitUI" {...this.props} />,
      isOwnUnit && <UnitProxy key="UnitProxy" unitID={unitID} />,
    ];
  }
}

export default connect((props, ref) => ({
  unit: `units/${props.unitID}`,
}))(Unit);
