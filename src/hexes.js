const hexSize = 256 / 2;
const hexHeight = hexSize * 2;
const hexWidth = Math.sqrt(3) / 2 * hexHeight;
const hexRatio = hexWidth / hexHeight;

const hexCorner = ({
  index,
  size = hexSize,
  center = { x: 0, y: 0 },
  offset = { x: 1, y: 1 },
}) => {
  const degrees = 60 * index + 30;
  const radians = Math.PI / 180 * degrees;

  return {
    x: center.x + size * offset.x * Math.cos(radians),
    y: center.y + size * offset.y * Math.sin(radians),
  };
};

const cubeToHex = cube => {
  var x = cube.x;
  var y = cube.z;
  return { x, y };
};

const hexToCube = hex => {
  var x = hex.x;
  var z = hex.y;
  var y = -x - z;
  return { x, y, z };
};

const hexDirections = [
  { x: +1, y: 0 },
  { x: +1, y: -1 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: +1 },
  { x: 0, y: +1 },
];

const hexDirection = direction => hexDirections[direction];

const hexNeighbour = (hex, inputDirection) => {
  const direction = hexDirection(inputDirection);
  const x = hex.x + direction.x;
  const y = hex.y + direction.y;
  return { x, y };
};

const hexDistance = (from, to) =>
  (Math.abs(from.x - to.x) +
    Math.abs(from.x + from.y - to.x - to.y) +
    Math.abs(from.y - to.y)) /
  2;

const hexesWithin = (hex, N) => {
  const cube = hexToCube(hex);
  let results = [];

  let dx = -N;
  while (dx <= N) {
    let dy = -N;
    while (dy <= N) {
      if (dy >= Math.max(-N, -dx - N) && dy <= Math.min(N, -dx + N)) {
        const dz = -dx - dy;
        const x = cube.x + dx;
        const y = cube.y + dy;
        const z = cube.z + dz;
        results.push(cubeToHex({ x, y, z }));
      }
      dy++;
    }
    dx++;
  }

  return results;
};

const hexRectangle = (width, height) => {
  let results = [];
  const originOffset = -Math.floor(height) + 1;

  for (let r = originOffset; r < height + originOffset; r++) {
    const offset = Math.floor(-r / 2);
    for (let q = -offset; q < width - offset; q++) {
      const x = q;
      const y = -q - r;
      const z = -r;
      results.push(cubeToHex({ x, y, z }));
    }
  }

  return results;
};

const hexToPixels = hex => {
  const x = hexSize * Math.sqrt(3) * (hex.x + hex.y / 2);
  const y = hexSize * 3 / 2 * hex.y;

  return { x, y };
};

const hexToCoordinates = hex => {
  const x = hexSize * Math.sqrt(3) * (hex.x + hex.y / 2) / hexHeight;
  const y = hexSize * 3 / 2 * hex.y / hexHeight;

  return { x, y };
};

export {
  hexSize,
  hexHeight,
  hexWidth,
  hexRatio,
  hexCorner,
  cubeToHex,
  hexToCube,
  hexDirection,
  hexNeighbour,
  hexDistance,
  hexesWithin,
  hexRectangle,
  hexToPixels,
  hexToCoordinates,
};
