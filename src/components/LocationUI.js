import React from "react";

import LocationDataFetcher from "./LocationDataFetcher";

export default class LocationUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { focused: false };
  }

  focus = event => {
    event.preventDefault();
    this.setState({ focused: true });
  };

  unfocus = event => {
    event.preventDefault();
    this.setState({ focused: false });
  };

  render() {
    const { x, y } = this.props;
    const { focused } = this.state;

    return (
      <div
        className="locationUI"
        style={{
          "--x": x,
          "--y": y,
        }}
      >
        <button
          type="button"
          className={`locationButton ${focused ? "focused" : "notFocused"}`}
          aria-pressed={focused}
          aria-label={`Focus tile {x},{y}`}
          onMouseEnter={this.focus}
          onTouchStart={this.focus}
          onFocus={this.focus}
          onMouseLeave={this.unfocus}
          onTouchEnd={this.unfocus}
          onBlur={this.unfocus}
          tabIndex={y * 100 + x}
        />

        {focused && <LocationDataFetcher {...this.props} />}
      </div>
    );
  }
}
