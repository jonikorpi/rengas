import React from "react";
import EasyStar from "easystarjs";

import { lerp } from "../utilities/helpers.js";

class MovementManager extends React.Component {
  pathfinding = new EasyStar.js();
  updateLoop = null;

  moving = false;
  headingX = null;
  headingY = null;

  fromX = null;
  fromY = null;
  fromExactX = null;
  fromExactY = null;
  toX = null;
  toY = null;
  toExactX = null;
  toExactY = null;

  startTime = null;
  arrivalTime = null;

  componentDidMount() {
    this.updateTiles();

    this.pathfinding.setAcceptableTiles([1, 2, 3]);
    this.pathfinding.setTileCost(2, 2);
    this.pathfinding.setTileCost(3, 3);
    this.pathfinding.enableCornerCutting();
  }

  componentWillUnmount() {
    if (this.updateLoop) {
      window.cancelAnimationFrame(this.updateLoop);
    }
  }

  componentDidUpdate() {
    this.updateTiles();
  }

  updateTiles = () => {
    const { tiles } = this.props;

    this.pathfinding.setGrid(tiles.reduce(pathfindingGridFromTiles, []));
  };

  headTowards = (toX, toY) => {
    const { state } = this.props;
    const { exactX, exactY } = state.position;

    this.headingX = toX;
    this.headingY = toY;

    this.startMoving(exactX, exactY, toX, toY);
  };

  startMoving = (fromX, fromY, toX, toY) => {
    this.fromExactX = fromX;
    this.fromExactY = fromY;

    if (this.moving) {
      if (this.updateLoop) {
        window.cancelAnimationFrame(this.updateLoop);
      }
      this.stop();
    }

    this.moving = true;
    this.toExactX = toX;
    this.toExactY = toY;

    this.fromX = Math.floor(this.fromExactX);
    this.fromY = Math.floor(this.fromExactY);
    this.toX = Math.floor(this.toExactX);
    this.toY = Math.floor(this.toExactY);

    if (this.fromX === this.toX && this.fromY === this.toY) {
      this.commitMovement(
        this.fromExactX,
        this.fromExactY,
        this.toExactX,
        this.toExactY
      );
    } else {
      this.findPath(this.fromX, this.fromY, this.toX, this.toY);
    }
  };

  findPath = (fromX, fromY, toX, toY) => {
    this.pathfinding.findPath(fromX, fromY, toX, toY, this.commitPath);
    this.pathfinding.calculate();
  };

  commitPath = path => {
    if (path && path[1]) {
      this.commitMovement(
        this.fromExactX,
        this.fromExactY,
        path[1].x,
        path[1].y
      );
    } else {
      console.warn("Could not find proper path", path);
    }
  };

  commitMovement = (fromX, fromY, toX, toY) => {
    const { state, move } = this.props;

    const distance = Math.sqrt(
      Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2)
    );
    this.startTime = Date.now();
    this.arrivalTime = this.startTime + state.speed * Math.abs(distance) * 1000;

    move(fromX, fromY, toX, toY);
    this.updateLoop = window.requestAnimationFrame(this.checkForArrival);
  };

  checkForArrival = timestamp => {
    const { arrivalTime } = this;
    const now = timestamp + performance.timing.navigationStart;
    const arrived = arrivalTime <= now;

    if (arrived) {
      const arrivedAtHeading =
        this.headingX === this.toExactX && this.headingY === this.toExactY;
      if (arrivedAtHeading) {
        this.stop();
      } else {
        this.startMoving(
          this.toExactX,
          this.toExactY,
          this.headingX,
          this.headingY
        );
      }
    } else {
      this.updateLoop = window.requestAnimationFrame(this.checkForArrival);
    }
  };

  stop = () => {
    const { startTime, arrivalTime } = this;
    const now = Date.now();

    if (now >= arrivalTime) {
      this.props.move(this.toExactX, this.toExactY);
    } else {
      const completion = (arrivalTime - now) / (arrivalTime - startTime);
      const stoppedAtX = lerp(this.fromExactX, this.toExactX, completion);
      const stoppedAtY = lerp(this.fromExactY, this.toExactY, completion);

      this.fromExactX = stoppedAtX;
      this.fromExactY = stoppedAtY;

      this.props.move(stoppedAtX, stoppedAtY);
    }

    this.moving = false;
  };

  render() {
    return this.props.children(this.headTowards);
  }
}

const pathfindingGridFromTiles = (results, tile) => {
  results[tile.y] = results[tile.y] ? results[tile.y] : [];
  results[tile.y][tile.x] = tile.impassable ? 0 : 1;
  return results;
};

export default MovementManager;
