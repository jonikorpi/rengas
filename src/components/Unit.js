import React from "react";
import { connect } from "react-firebase";
import Loadable from "react-loadable";

import UnitUI from "./UnitUI";
import Loader from "./Loader";

const UnitProxy = Loadable({
  loader: () => import("./UnitProxy"),
  loading: Loader,
});

class Unit extends React.Component {
  render() {
    const { unitID, unit, userID, isDevelopment } = this.props;

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
          color: isOwnUnit ? "red" : undefined,
        }}
      >
        {unit && unit.type}
      </div>,
      isOwnUnit && <UnitUI key="UnitUI" {...this.props} />,
      isOwnUnit && (
        /*isDevelopment &&*/ <UnitProxy
          key="UnitProxy"
          unitID={unitID}
          isDevelopment={isDevelopment}
        />
      ),
    ];
  }
}

export default connect((props, ref) => ({
  unit: `units/${props.unitID}`,
}))(Unit);
