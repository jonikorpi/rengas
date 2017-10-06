import uuid from "uuid/v4";

import { hexRectangle, hexesWithin } from "../hexes.js";

const rules = {
  areaWidth: 7,
  worldLength: 12,
  secondsPerTurn: 60,
  maxMana: 10,
};

const listTilesInArea = areaLength => {
  return hexRectangle(rules.areaWidth, areaLength).reduce((tiles, tile) => {
    tiles[tile.x] = tiles[tile.x] || {};
    tiles[tile.x][tile.y] = true;
    return tiles;
  }, {});
};

const listTilesInRange = ({ x, y, range = 1, areaLength }) => {
  const tilesInArea = listTilesInArea(areaLength);
  return hexesWithin({ x: x, y: y }, range).filter(
    tile => tilesInArea[tile.x] && tilesInArea[tile.x][tile.y]
  );
};

const getVisibleTilesForPlayer = (gameState, playerID) => {
  let units = [];

  Object.keys(gameState.locations).forEach(x => {
    Object.keys(gameState.locations[x]).forEach(y => {
      const unit = { ...gameState.locations[x][y].unit };
      unit.x = +x;
      unit.y = +y;

      if (unit && unit.playerID === playerID) {
        units.push(unit);
      }
    });
  });

  return units.reduce((visibleTiles, unit) => {
    listTilesInRange({
      ...unit,
      areaLength: gameState.details.areaLength,
    }).forEach(({ x, y }) => {
      visibleTiles[x] = visibleTiles[x] || {};
      visibleTiles[x][y] = true;
    });

    return visibleTiles;
  }, {});
};

const getFreshArea = startTime => {
  // listTilesInRange({
  //   ...startingLocation,
  //   range: 2,
  //   areaLength: gameState.details.areaLength,
  // }).forEach(({ x, y }) => {
  //   gameState.locations[x] = gameState.locations[x] || {};
  //   gameState.locations[x][y] = {
  //     tile: {
  //       type: "water",
  //     },
  //   };
  // });

  return {
    details: {
      areaLength: 24,
    },
    players: {},
    locations: {
      "0": {
        "0": { tile: { type: "water" } },
        "2": { tile: { type: "water" } },
        "5": { tile: { type: "water" } },
        "6": { tile: { type: "water" } },
      },
      "1": {
        "1": { tile: { type: "water" } },
        "3": { tile: { type: "water" } },
        "4": { tile: { type: "water" } },
      },
      "7": {
        "0": { tile: { type: "water" } },
      },
    },
  };
};

const addUnitToLocation = (unit, x, y, gameState) => {
  gameState.locations[x] = gameState.locations[x] || {};
  gameState.locations[x][y] = gameState.locations[x][y] || {};

  if (!gameState.locations[x][y].unit) {
    gameState.locations[x][y].unit = unit;
  }

  return gameState;
};

const addPlayerToArea = ({ playerID, startingX }, currentArea) => {
  let gameState = { ...currentArea };
  const startingLocation = {
    // x: startingX,
    // y: gameState.details.areaLength - 1,
    x: 0,
    y: 0,
  };

  addUnitToLocation(
    {
      unitID: uuid(),
      playerID: playerID,
      type: "ship",
      range: gameState.details.areaLength,
    },
    startingLocation.x,
    startingLocation.y,
    gameState
  );

  gameState.players[playerID] = {
    visibleTiles: getVisibleTilesForPlayer(gameState, playerID),
    mana: 0,
    lastUsedManaAt: Date.now(),
  };

  return gameState;
};

const singlePlayerUserID = "solo";

export {
  rules,
  getFreshArea,
  addPlayerToArea,
  singlePlayerUserID,
  listTilesInRange,
  getVisibleTilesForPlayer,
};
