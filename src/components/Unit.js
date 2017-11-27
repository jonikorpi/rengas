import React from "react";
import { connect } from "react-firebase";

import UnitUI from "./UnitUI";

class Unit extends React.Component {
  render() {
    const { unitID, unit, userID } = this.props;

    if (!unit) {
      return null;
    }

    const [x, y] = unit.location.split(",");

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
      unit.owner === userID && <UnitUI key="UnitUI" {...this.props} />,
    ];
  }
}

export default connect((props, ref) => ({
  unit: `units/${props.unitID}`,
}))(Unit);
