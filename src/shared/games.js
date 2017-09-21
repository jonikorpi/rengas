const rules = {
  worldWidth: 8,
  plateLength: 16,
};

const createFreshGameState = players => {
  const startTime = Date.now();

  return {
    startedAt: startTime,
    players: players.reduce((players, playerID, index) => {
      players[playerID] = {
        canSee: {
          [Math.floor(rules.worldWidth / 2)]: {
            [index * rules.plateLength + rules.plateLength / 2]: true,
          },
        },
        lastCommand: startTime,
        lastMana: 0,
      };
      return players;
    }, {}),
    world: players.reduce((world, playerID, index) => {
      world[Math.floor(rules.worldWidth / 2)] = {
        [index * rules.plateLength + rules.plateLength / 2]: {
          tile: {},
          unit: {},
        },
      };
      return world;
    }, {}),
  };
};

const singlePlayerUserID = "solo";

export { rules, createFreshGameState, singlePlayerUserID };
