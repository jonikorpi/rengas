import React from "react";

import Tooltip from "./Tooltip";
import { rules } from "../shared/helpers.js";

export default class LocationUI extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: false,
      selected: false,
    };

    this.startedX = null;
    this.startedY = null;
    this.movedX = null;
    this.movedY = null;
  }

  componentWillUnmount() {
    clearTimeout(this.selectionTimer);
  }

  focus = () => this.setState({ focused: true });
  unfocus = () => this.setState({ focused: false });

  select = () => {
    const { unit, userID } = this.props;

    if (unit && unit.owner === userID) {
      this.setState({ selected: true });

      window.addEventListener("mouseup", this.onMouseUp, false);
      window.addEventListener("mousemove", this.onMouseMove, false);
      // document.addEventListener("mouseleave", this.onMouseOut, false);
    }
  };

  unselect = () => {
    const { unit, unitID, userID } = this.props;
    const locationX = this.props.x;
    const locationY = this.props.y;

    if (unit && unit.owner === userID) {
      const { startedX, startedY, movedX, movedY } = this;

      if (
        movedX !== null &&
        movedY !== null &&
        startedX !== null &&
        startedY !== null
      ) {
        const { width, height, x, y } = this.button.getBoundingClientRect();
        const buttonX = x + window.scrollX;
        const buttonY = y + window.scrollY;

        const targetX =
          locationX +
          Math.round(-1 + (movedX - (startedX - buttonX + width / 2)) / -width);
        const targetY =
          locationY +
          Math.round(
            -1 + (movedY - (startedY - buttonY + height / 2)) / -height
          );

        console.log(
          unitID,
          "wants to target from",
          locationX,
          locationY,
          "to",
          targetX,
          targetY
        );
      }

      this.setState({
        selected: false,
      });

      this.startedX = null;
      this.startedY = null;
      this.movedX = null;
      this.movedY = null;

      window.removeEventListener("mouseup", this.onMouseUp);
      window.removeEventListener("mousemove", this.onMouseMove);
      // document.removeEventListener("mouseleave", this.onMouseOut);
    }
  };

  focusAndSelect = () => {
    this.focus();
    this.select();
  };

  unfocusAndUnselect = () => {
    this.unfocus();
    this.unselect();
  };

  placePointer = (x, y) => {
    this.startedX = x;
    this.startedY = y;
  };

  movePointer = (x, y) => {
    const { startedX, startedY } = this;
    this.movedX = startedX - x;
    this.movedY = startedY - y;
  };

  onFocus = event => this.focus();
  onBlur = event => this.unfocus();
  onMouseEnter = event => this.focus();
  onMouseLeave = event => this.unfocus();

  onMouseDown = event => {
    this.placePointer(event.pageX, event.pageY);
    this.select();
  };
  // onClick = event => {
  //   if (this.state.selected) {
  //     this.unselect();
  //   } else {
  //     this.select();
  //   }
  // };
  onTouchStart = event => {
    this.selectionTimer = setTimeout(this.selectionTimerFired, 200);
  };
  selectionTimerFired = () => {
    if (this.movedX < 10 && this.movedY < 10) {
      this.focusAndSelect();
    }
  };
  onTouchEnd = event => {
    event.preventDefault();
    clearTimeout(this.selectionTimer);
    this.unfocusAndUnselect();
  };

  onTouchCancel = event => this.unfocusAndUnselect();
  // onMouseOut = event => this.unfocusAndUnselect();

  onMouseUp = event => {
    this.unselect();
    return false;
  };
  onMouseMove = event => this.movePointer(event.pageX, event.pageY);
  onTouchMove = event => {
    if (this.state.selected) {
      event.preventDefault();
      this.placePointer(
        event.changedTouches[0].pageX,
        event.changedTouches[0].pageY
      );
      this.movePointer(
        event.changedTouches[0].pageX,
        event.changedTouches[0].pageY
      );
    }
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
        ref={ref => {
          this.button = ref;
        }}
      >
        <button
          type="button"
          className={`locationButton ${focused ? "focused" : "notFocused"} ${
            selected ? "selected" : "notSelected"
          }`}
          aria-pressed={selected}
          aria-label={`Select tile ${x},${y}`}
          tabIndex={(y - topMostVisibleY) * rules.worldWidth + x + 1}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onMouseDown={this.onMouseDown}
          // onMouseUp={this.onMouseUp}
          // onClick={this.onClick}
          onTouchStart={this.onTouchStart}
          onTouchMove={this.onTouchMove}
          onTouchEnd={this.onTouchEnd}
          onTouchCancel={this.onTouchCancel}
        />

        {focused && <Tooltip {...this.props} />}
      </div>
    );
  }
}
