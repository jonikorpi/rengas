const rules = {
  worldWidth: 8,
};

const listTilesInRange = (x, y, range = 1, diagonal = false) => {
  const tiles = [];

  for (let xOffset = -range; xOffset <= range; xOffset++) {
    for (let yOffset = -range; yOffset <= range; yOffset++) {
      const thisX = Math.floor(x + xOffset);
      const thisY = Math.floor(y + yOffset);
      const isInRange =
        thisX < rules.worldWidth &&
        thisX >= 0 &&
        (diagonal
          ? Math.sqrt(Math.pow(x - thisX, 2)) +
            Math.sqrt(Math.pow(y - thisY, 2))
          : Math.abs(x - thisX) + Math.abs(y - thisY) <= range);

      if (isInRange) {
        tiles.push({ x: thisX, y: thisY });
      }
    }
  }

  return tiles;
};

const getNeighbours = (vision, x, y) => {
  return listTilesInRange(x, y, 1, true).map(location => {
    return {
      x: location.x,
      y: location.y,
      visible: !!vision[`${x},${y}`],
    };
  });
};

export { rules, listTilesInRange, getNeighbours };
