import React from "react";

const player = {
  state: {
    speed: 1,
    vision: 5,
    stealthed: false,
    region: "regionID",
    position: {
      write: "uid === $entityID",
      x: 0,
      y: 0,
      exactX: 0, // (exactX - x < 1 || > -1)
      exactY: 0, // (exactY - y < 1 || > -1)
      validate: `
        newData.x,y,exactX,exactY must be sane compared to data.moving.x,y,exactX,exactY
        && region.entities.newData.x.y.entityID || && region.stealthedEntities.newData.x.y.entityID
        && !region.entities.data.x.y.entityID || && !region.stealthedEntities.data.x.y.entityID
        && region.x,y must exist and not be impassable
        && !moving || moving.time >= now
      `,
    },
  },
  moving: {
    write: "uid === $entityID",
    time: Date.now(), // must match now
    speed: 1, // must match state.speed * currentTile.speedModifier
    x: 0,
    y: 0,
    exactX: 0, // (exactX - x < 1 || > -1)
    exactY: 0, // (exactY - y < 1 || > -1)
    validate: `
      !casting.stationary
      && region.x,y must exist and not be impassable
      && x,y is max. 1.5 tiles away from state.x,y
      && tile.z - ownTile.z === 0
        || tile.z - ownTile.z + tile.zModifier + ownTile.zModifier === 0
    `,
  },
  casting: {
    write: "uid === $entityID",
    startedAt: Date.now(), // must match now
    type: "…",
    stationary: true, // post-verify in function
    validate: `
      stationary && !moving
      || !stationary
    `,
  },
  finishedCasting: {
    // triggers onCreate
    finishedAt: Date.now() + 1000, // must match now
    startedAt: Date.now() - 1000, // must match casting.startedAt
    type: "…", // must match casting.type
    stationary: true, // must match casting.type
  },
  events: {
    eventID: {
      time: Date.now() - 1000,
      type: "…",
      additionalData: -50,
    },
  },
  read: `
    uid === $entityID
    || !state.stealthed 
      && (x - readerX) + (y - readerY) + (z - readerZ) 
        <= (readerRange - tile.stealth) || <= (-readerRange + tile.stealth)
    || state.stealthed && (x - readerX) + (y - readerY) + (z - readerZ) <= 1 || <= -1
  `,
};

class LimboPlayer extends React.Component {
  state = {
    state: {
      speed: 1,
      vision: 5,
      stealthed: null,
      region: 0,
      position: {
        x: 0,
        y: 0,
        exactX: 0,
        exactY: 0,
      },
    },
    moving: null,
    casting: null,
    events: null,
  };

  handleMovement = (x, y) => {
    const { tiles, width, height } = this.props;

    this.setState({
      moving: {
        time: Date.now(),
        speed: this.state.state.speed,
        x: Math.floor(x),
        y: Math.floor(y),
        exactX: x,
        exactY: y,
      },
    });
  };

  render() {
    const { children } = this.props;

    return children(this.state, this.handleMovement);
  }
}

export default LimboPlayer;
