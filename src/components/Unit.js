import React from "react";
import { connect } from "react-firebase";

class Unit extends React.Component {
  render() {
    const { x, y, unitID, unit } = this.props;

    return (
      <div
        id={unitID}
        className="unit"
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        {unit && unit.type}
      </div>
    );
  }
}

export default connect((props, ref) => ({
  unit: `units/${props.unitID}`,
}))(Unit);
