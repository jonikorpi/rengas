import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const despawnPlayer = (currentPlayer, startedAt, userID) => {
  console.log(`Despawning player ${userID}`);
  let player = currentPlayer || {};

  player.session = null;
  player.locations = null;
  player.units = null; // TODO: need to also remove them from locations

  return player;
};

const spawnPlayer = (currentPlayer, startedAt, userID) => {
  console.log(`Spawning player ${userID}`);
  let player = currentPlayer || {};

  player.session = {
    startedAt: startedAt,
    canSee: {
      [userID]: {
        "0,0": {
          sight: true,
          trueSight: true,
        },
      },
    },
  };

  return player;
};

export default class WorldProxy extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      typeof nextProps.startedAt !== typeof this.props.startedAt &&
      nextProps.userID
    ) {
      firebase
        .database()
        .ref(`players/${nextProps.userID}`)
        .transaction(player => {
          return nextProps.startedAt === null
            ? despawnPlayer(player, nextProps.startedAt, nextProps.userID)
            : spawnPlayer(player, nextProps.startedAt, nextProps.userID);
        });
    }
  }

  render() {
    return null;
  }
}
