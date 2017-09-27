const config = {
  tileSize: 256,
  tileCanvasMultiplier: 3,
};

const random = (number = 1, seed = 1) => {
  const rand = Math.sin(seed) * 10000;
  return Math.abs((rand - Math.floor(rand)) * number);
};

const getSeed = ({ x, y }) => {
  return Math.abs(x * 13 * (y * 53));
};

const baseTile = ({ x, y }) => {
  let seed = getSeed({ x: x, y: y });
  const baseCoordinate = 256 / 2;
  const radius = 32;

  const directions = [[-1, -1], [1, -1], [1, 1], [-1, 1]];

  const corners = directions
    .map(direction => [
      // Spread into rectangle
      direction[0] * baseCoordinate,
      direction[1] * baseCoordinate,
    ])
    .map((corner, index) => [
      // Push corners
      corner[0] + radius * directions[index][0] * random(1, seed++),
      corner[1] + radius * directions[index][1] * random(1, seed++),
    ]);

  return corners;
};

export { config, random, getSeed, baseTile };
