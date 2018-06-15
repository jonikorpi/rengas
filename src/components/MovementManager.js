import React from "react";
import EasyStar from "easystarjs";

import { lerp } from "../utilities/helpers.js";

class MovementManager extends React.Component {
  pathfinding = new EasyStar.js();
  updateLoop = null;

  moving = false;
  fromExactX = null;
  fromExactY = null;
  toExactX = null;
  toExactY = null;

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

  headTowards = (toExactX, toExactY) => {
    const { state } = this.props;

    if (this.moving) {
      this.stopAndStartMoving(toExactX, toExactY);
    } else {
      this.startMoving(state.exactX, state.exactY, toExactX, toExactY);
    }
  };

  stop = () => {
    if (this.updateLoop) {
      window.cancelAnimationFrame(this.updateLoop);
    }

    const stoppedAtX = 0;
    const stoppedAtY = 0;

    // finds current x,y from path by lerping it,
    // then commits it to state

    this.fromExactX = null;
    this.fromExactY = null;
    this.toExactX = null;
    this.toExactY = null;
    this.moving = false;
    return [stoppedAtX, stoppedAtY];
  };

  stopAndStartMoving = (toExactX, toExactY) => {
    const [stoppedAtX, stoppedAtY] = this.stop();

    this.startMoving(stoppedAtX, stoppedAtY, toExactX, toExactY);
  };

  startMoving = (fromExactX, fromExactY, toExactX, toExactY) => {
    this.moving = true;

    const fromX = Math.floor(fromExactX);
    const fromY = Math.floor(fromExactY);
    const toX = Math.floor(toExactX);
    const toY = Math.floor(toExactY);
    const isInsideSameTile = fromX === toX && fromY === toY;

    this.fromExactX = fromExactX;
    this.fromExactY = fromExactY;
    this.toExactX = toExactX;
    this.toExactY = toExactY;

    if (isInsideSameTile) {
      this.commitMovement([
        { x: fromExactX, y: fromExactY },
        { x: toExactX, y: toExactY },
      ]);
    } else {
      this.findPath(fromX, fromY, toX, toY);
    }
  };

  findPath = (fromX, fromY, toX, toY) => {
    this.pathfinding.findPath(fromX, fromY, toX, toY, this.commitPath);
    this.pathfinding.calculate();
  };

  commitPath = path => {
    const waypoints = [...path];

    if (waypoints && waypoints.length > 1) {
      waypoints[0].x = this.fromExactX;
      waypoints[0].y = this.fromExactY;
      waypoints[waypoints.length - 1].x = this.toExactX;
      waypoints[waypoints.length - 1].y = this.toExactY;

      this.commitMovement(waypoints);
    } else {
      this.stop();
      console.warn("Could not find proper path", path);
    }
  };

  commitMovement = waypoints => {
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
