const isDevelopment = process.env.NODE_ENV === "development";

const listTilesInRange = (
  x,
  y,
  range = 1,
  diagonal = false,
  xStart = 0,
  xEnd = 8
) => {
  const tiles = [];

  for (let xOffset = -range; xOffset <= range; xOffset++) {
    for (let yOffset = -range; yOffset <= range; yOffset++) {
      const thisX = Math.floor(x + xOffset);
      const thisY = Math.floor(y + yOffset);
      const isInRange =
        thisX < xEnd &&
        thisX >= xStart &&
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

const getNeighbours = (vision, x, y) =>
  listTilesInRange(x, y, 1, true).map(location => ({
    x: location.x,
    y: location.y,
    visible: !!vision[`${location.x},${location.y}`],
  }));

// https://medium.com/@dtipson/creating-an-es6ish-compose-in-javascript-ac580b95104a
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const random = (number = 1, seed = Math.random()) => {
  const rand = Math.sin(+seed) * 10000;
  return Math.abs((rand - Math.floor(rand)) * number);
};

// const createGrid = (x = 3, y = 3) =>
//   Array(y)
//     .fill(undefined)
//     .map(() => Array(x).fill(undefined));

const createGrid = (width = 3, height = 3) => {
  const grid = {};

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      grid[`${x},${y}`] = {};
    }
  }

  return grid;
};

export {
  isDevelopment,
  listTilesInRange,
  getNeighbours,
  compose,
  random,
  createGrid,
};
