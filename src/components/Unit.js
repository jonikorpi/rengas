import React from "react";

export default class Unit extends React.PureComponent {
  render() {
    const { x, y, areaLength, unitID } = this.props;

    return (
      <div
        id={unitID}
        className={`unit ${y > areaLength / 2 ? "lower-half" : "upper-half"}`}
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        U
      </div>
    );
  }
}
