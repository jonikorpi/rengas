const rules = {
  worldWidth: 7,
  plateLength: 21,
  minimumPlateLength: 5,
  secondsPerTurn: 10,
  manaPerTurn: 1,
  maxMana: 10,
  startingMana: 1,
};

const createFreshGameState = players => {
  const startTime = Date.now();

  return {
    details: {
      startedAt: startTime,
      playerCount: players.length,
    },
    players: players.reduce((players, playerID, index) => {
      players[playerID] = {
        canSee: {
          [Math.floor(rules.worldWidth / 2)]: {
            [Math.floor(
              index * rules.plateLength + rules.plateLength / 2
            )]: true,
          },
          0: { 0: true },
        },
        usedMana: 0,
        reserveMana: rules.startingMana,
      };
      return players;
    }, {}),
    world: players.reduce((world, playerID, index) => {
      world[Math.floor(rules.worldWidth / 2)] = {
        [Math.floor(index * rules.plateLength + rules.plateLength / 2)]: {
          tile: { type: "tileType" },
          unit: { unitID: "unitID" },
        },
      };
      return world;
    }, {}),
  };
};

const singlePlayerUserID = "solo";

export { rules, createFreshGameState, singlePlayerUserID };
