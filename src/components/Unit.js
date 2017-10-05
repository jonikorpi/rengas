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
        <div className="debug">{JSON.stringify(this.props, false, 2)}</div>
      </div>
    );
  }
}
