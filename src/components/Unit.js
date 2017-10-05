import React from "react";

export default class Unit extends React.PureComponent {
  render() {
    const { x, y, worldLength, unitID } = this.props;

    return (
      <div
        id={unitID}
        className={`unit ${y > worldLength / 2 ? "lower-half" : "upper-half"}`}
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
