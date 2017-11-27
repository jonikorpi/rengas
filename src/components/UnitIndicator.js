import React from "react";
import { connect } from "react-firebase";

class UnitIndicator extends React.Component {
  render() {
    const { x, y, unitExists } = this.props;

    return unitExists ? (
      <div
        className="unitIndicator"
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        ?
      </div>
    ) : null;
  }
}

export default connect((props, ref) => ({
  unitExists: `locations/${props.x},${props.y}/unit/exists`,
}))(UnitIndicator);
