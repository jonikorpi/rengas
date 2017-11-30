import React from "react";

import Tooltip from "./Tooltip";
import { rules } from "../shared/helpers.js";

export default class LocationUI extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { focused: false, selected: false };
  }

  focus = event => {
    // event.preventDefault();
    this.setState({ focused: true });
  };

  unfocus = event => {
    event.preventDefault();
    this.setState({ focused: false });
  };

  select = event => {
    this.setState({ selected: true });
    window.addEventListener("mouseup", this.unselect, false);
    window.addEventListener("mousemove", this.movePointer, false);
    window.addEventListener("touchmove", this.movePointer, false);
  };

  unselect = event => {
    this.setState({ selected: false });
    window.removeEventListener("mouseup", this.unselect);
    window.removeEventListener("mousemove", this.movePointer);
    // window.removeEventListener("touchmove", this.movePointer);
    // window.removeEventListener("touchforcechange", this.movePointer);
  };

  focusAndSelect = event => {
    this.focus(event);
    this.select(event);
  };

  unfocusAndUnselect = event => {
    this.unfocus(event);
    this.unselect(event);
  };

  movePointer = event => {
    event.preventDefault();
  };

  render() {
    const { x, y, topMostVisibleY } = this.props;
    const { focused, selected } = this.state;

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
          className={`locationButton ${focused ? "focused" : "notFocused"} ${
            selected ? "selected" : "notSelected"
          }`}
          aria-pressed={selected}
          aria-label={`Select tile {x},{y}`}
          onFocus={this.focus}
          onMouseEnter={this.focus}
          onBlur={this.unfocus}
          onMouseLeave={this.unfocus}
          onMouseDown={this.select}
          onTouchStart={this.focusAndSelect}
          onTouchEnd={this.unfocusAndUnselect}
          tabIndex={(y - topMostVisibleY) * rules.worldWidth + x + 1}
        />

        {focused && <Tooltip {...this.props} />}
      </div>
    );
  }
}
