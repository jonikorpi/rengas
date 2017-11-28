import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { connect } from "react-firebase";

import { listTilesInRange, rules } from "../shared/helpers.js";

const executeAction = (action, ...otherArguments) => {
  switch (action) {
    case "spawn":
      return spawnPlayer(...otherArguments);
    case "concede":
      return despawnPlayer(...otherArguments);
    default:
      return console.warn("Unrecognized action. Skipping.");
  }
};

const despawnPlayer = async (command, userID) => {
  console.log(`Despawning player ${userID}`);

  // Remove session
  firebase
    .database()
    .ref(`players/${userID}/session`)
    .remove();

  // Despawn all units
  const units = await firebase
    .database()
    .ref("units")
    .orderByChild("owner")
    .equalTo(userID)
    .once("value");

  units.forEach(unit => {
    despawnUnit(unit.key, unit.val().location);
  });

  return;
};

const despawnUnit = (unitID, location) => {
  // Delete unit
  firebase
    .database()
    .ref(`units/${unitID}`)
    .remove();

  // Remove unit from location
  firebase
    .database()
    .ref(`locations/${location}/unit`)
    .remove();
};

const spawnPlayer = async (command, userID) => {
  const existingPlayer = await firebase
    .database()
    .ref(`players/${userID}/session`)
    .once("value");

  if (existingPlayer.val()) {
    console.log(`Not spawning ${userID} because session already exists`);
    return;
  }

  console.log(`Spawning player ${userID}`);

  // Create city unit placeholder
  const cityID = firebase
    .database()
    .ref("units")
    .push().key;

  // Find a free location
  let spawnFound = false;
  let spawnLocation, spawnLocationID;

  while (!spawnFound) {
    spawnLocation = {
      x: Math.floor(Math.random() * (rules.worldWidth - 1)),
      y: Math.floor(Math.random() * 20),
    };
    spawnLocationID = `${spawnLocation.x},${spawnLocation.y}`;

    // Add city to location
    const citySpawnAttempt = await firebase
      .database()
      .ref(`locations/${spawnLocationID}`)
      .transaction(realLocation => {
        const location = realLocation || {};

        if (location.unit) {
          return;
        }

        const tile = location.tile || { type: "plains" };

        return {
          tile: tile,
          unit: {
            ID: cityID,
            exists: true,
          },
        };
      });

    spawnFound = citySpawnAttempt.committed ? true : false;
  }

  // Add city stats
  firebase
    .database()
    .ref(`units/${cityID}`)
    .set({
      location: spawnLocationID,
      type: "city",
      owner: userID,
    });

  // Set session
  firebase
    .database()
    .ref(`players/${userID}/session`)
    .set({
      playState: "playing",
      vision: {
        [spawnLocationID]: {
          sight: 1,
          trueSight: 1,
        },
        ...listTilesInRange(spawnLocation.x, spawnLocation.y, 9).reduce(
          (tiles, tile) => {
            tiles[`${tile.x},${tile.y}`] = tiles[`${tile.x},${tile.y}`] || {};
            tiles[`${tile.x},${tile.y}`]["sight"] = 1;
            return tiles;
          },
          {}
        ),
        ...listTilesInRange(spawnLocation.x, spawnLocation.y, 3).reduce(
          (tiles, tile) => {
            tiles[`${tile.x},${tile.y}`] = tiles[`${tile.x},${tile.y}`] || {};
            tiles[`${tile.x},${tile.y}`]["trueSight"] = 1;
            return tiles;
          },
          {}
        ),
      },
    });
};

class PlayerProxy extends React.Component {
  componentDidUpdate(previousProps) {
    const previousCommand = previousProps.command || {};
    const command = this.props.command || {};

    if (previousCommand.ID !== command.ID && command.ID) {
      console.log(`Executing command #${command.ID}: ${command.action}`);
      executeAction(command.action, command, this.props.userID);
    }
  }

  render() {
    return null;
  }
}

export default connect((props, ref) => ({
  command: `players/${props.userID}/command`,
}))(PlayerProxy);
