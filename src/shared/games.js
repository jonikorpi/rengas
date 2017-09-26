import uuid from "uuid/v4";

const rules = {
  worldWidth: 8,
  plateLength: 36,
  minimumPlateLength: 5,
  secondsPerTurn: 60,
  maxMana: 10,
};

const listTilesInRange = ({ x, y, range = 1 }) => {
  const tiles = [];

  for (let xOffset = -range; xOffset <= range; xOffset++) {
    for (let yOffset = -range; yOffset <= range; yOffset++) {
      const thisX = Math.floor(x + xOffset);
      const thisY = Math.floor(y + yOffset);
      const isInRange =
        Math.sqrt(Math.pow(x - thisX, 2) + Math.pow(y - thisY, 2)) <= range;

      // Doesn't take into account world length
      const isLikelyInWorld =
        thisX <= rules.worldWidth && thisX >= 0 && thisY >= 0;

      if (isInRange && isLikelyInWorld) {
        tiles.push({ x: thisX, y: thisY });
      }
    }
  }

  return tiles;
};

const getVisibleTilesForPlayer = (gameState, playerID) => {
  let units = [];

  Object.keys(gameState.world).forEach(x => {
    Object.keys(gameState.world[x]).forEach(y => {
      const unit = { ...gameState.world[x][y].unit };
      unit.x = +x;
      unit.y = +y;

      if (unit && unit.playerID === playerID) {
        units.push(unit);
      }
    });
  });

  return units.reduce((visibleTiles, unit) => {
    listTilesInRange(unit).forEach(({ x, y }) => {
      if (y <= gameState.details.playerCount * rules.plateLength) {
        visibleTiles[x] = visibleTiles[x] || {};
        visibleTiles[x][y] = true;
      }
    });

    return visibleTiles;
  }, {});
};

const getStartingYByIndex = index =>
  Math.floor(index * rules.plateLength + rules.plateLength / 2);

const getFreshGameState = startTime => {
  return {
    details: {
      startedAt: startTime,
      playerCount: 0,
    },
    players: {},
    world: {},
  };
};

const addPlayerToGameState = ({ playerID, startingX }, currentGameState) => {
  const gameState = { ...currentGameState };
  const startingLocation = {
    x: startingX,
    y: getStartingYByIndex(gameState.details.playerCount),
  };

  listTilesInRange({ ...startingLocation, range: 1.5 }).forEach(({ x, y }) => {
    gameState.world[x] = gameState.world[x] || {};
    gameState.world[x][y] = {
      tile: {
        type: "land",
      },
    };
  });

  gameState.world[startingLocation.x][startingLocation.y].unit = {
    unitID: uuid(),
    playerID: playerID,
    type: "cityCenter",
    range: 2,
  };

  gameState.details.playerCount++;
  gameState.players[playerID] = {
    visibleTiles: getVisibleTilesForPlayer(gameState, playerID),
    mana: 0,
    lastUsedManaAt: Date.now(),
  };

  return gameState;
};

const singlePlayerUserID = "solo";

export { rules, getFreshGameState, addPlayerToGameState, singlePlayerUserID };
