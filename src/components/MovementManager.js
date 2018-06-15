import React from "react";

import { lerp } from "../utilities/helpers.js";

class MovementManager extends React.Component {
  loop = null;
  loopActive = false;

  componentDidUpdate() {
    if (this.props.moving) {
      this.loopActive = true;
      this.loop = window.requestAnimationFrame(this.updatePosition);
    }
  }

  componentWillUnmount() {
    if (this.loop) {
      window.cancelAnimationFrame(this.loop);
    }
  }

  headTowards = (exactX, exactY) => {
    const { state, move, tiles } = this.props;
    const x = Math.floor(exactX);
    const y = Math.floor(exactY);

    const currentPosition = this.getCurrentPosition();

    if (x === currentPosition.x && y === currentPosition.y) {
      move(state.position.exactX, state.position.exactY, exactX, exactY);
    } else {
      const path = findPath(
        [currentPosition.x, currentPosition.y],
        [x, y],
        tiles
      );
      const lastPoint = path[path.length - 1];
      const pathIsFree = lastPoint[0] === x && lastPoint[1] === y;

      if (pathIsFree) {
        move(state.position.exactX, state.position.exactY, exactX, exactY);
      } else {
        move(
          state.position.exactX,
          state.position.exactY,
          lastPoint[0] + 0.5,
          lastPoint[1] + 0.5
        );
      }
    }
  };

  stop = () => {
    const { move } = this.props;
    const currentPosition = this.getCurrentPosition();
    move(currentPosition.exactX, currentPosition.exactY);
  };

  getCurrentPosition = () => {
    const { state, moving } = this.props;
    return moving
      ? calculateCurrentPosition(state, moving)
      : { ...state.position };
  };

  updatePosition = () => {
    const { state, moving, move } = this.props;
    const currentPosition = this.getCurrentPosition();

    const tileHasChanged =
      currentPosition.x !== state.position.x ||
      currentPosition.y !== state.position.y;
    const destinationReachedButStillMoving =
      moving &&
      currentPosition.exactX === moving.exactX &&
      currentPosition.exactY === moving.exactY;

    console.log(
      "tileHasChanged",
      tileHasChanged,
      "destinationReachedButStillMoving",
      destinationReachedButStillMoving,
      currentPosition
      // state.position
      // moving
    );

    if (tileHasChanged || destinationReachedButStillMoving) {
      move(
        currentPosition.exactX,
        currentPosition.exactY,
        destinationReachedButStillMoving ? undefined : moving.exactX,
        destinationReachedButStillMoving ? undefined : moving.exactY
      );
      this.loopActive = false;
    }

    if (this.loopActive && moving) {
      this.loop = window.requestAnimationFrame(this.updatePosition);
    } else {
      this.loopActive = false;
    }
  };

  render() {
    return this.props.children(this.headTowards);
  }
}

// do this
const calculateCurrentPosition = (state, moving) => {
  const { time, speed } = moving;
  const now = Date.now();
  const distance = Math.sqrt(
    Math.pow(state.position.exactX - moving.exactX, 2) +
      Math.pow(state.position.exactY - moving.exactY, 2)
  );
  const arrival = time + speed * Math.abs(distance) * 1000;
  const progress = Math.max(0, Math.min(1, now / arrival));
  const exactX = lerp(state.position.exactX, moving.exactX, progress);
  const exactY = lerp(state.position.exactY, moving.exactY, progress);

  return {
    exactX,
    exactY,
    x: Math.floor(exactX),
    y: Math.floor(exactY),
  };
};

const findPath = (from, to, tiles) => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const nx = Math.abs(dx);
  const ny = Math.abs(dy);
  const signX = dx > 0 ? 1 : -1;
  const signY = dy > 0 ? 1 : -1;

  let point = [...from];
  let points = [point];

  for (let ix = 0, iy = 0; ix < nx || iy < ny; ) {
    const nextStepIsHorizontal = (0.5 + ix) / nx < (0.5 + iy) / ny;
    const canStepHorizontally = tiles[point[0] + signX][point[1]] !== 0;
    const canStepVertically = tiles[point[0]][point[1] + signY] !== 0;

    if (nextStepIsHorizontal && canStepHorizontally) {
      // next step is horizontal
      point[0] += signX;
      ix++;
    } else if (canStepVertically) {
      // next step is vertical
      point[1] += signY;
      iy++;
    } else {
      // can't take a step
      break;
    }
    points.push([point[0], point[1]]);
  }

  return points;
};

export default MovementManager;
