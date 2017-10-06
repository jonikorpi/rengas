import { hexSize, hexCorner } from "./hexes.js";

const lerp = (a, b, amount) => a + (b - a) * amount;

const random = (number = 1, seed = 1) => {
  const rand = Math.sin(seed) * 10000;
  return Math.abs((rand - Math.floor(rand)) * number);
};

const getSeed = (x, y) => {
  return Math.abs((x + 11) * 13 * ((y + 7) * 53));
};

const config = {
  tileSize: hexSize * 2,
  tileCanvasMultiplier: 2,
  waterLevel: -2,
  groundLevel: 0,
  shroudLevel: 20,
  shroudThickness: 1,
};

const baseTile = inputSeed => {
  let seed = inputSeed;
  const radius = 0.146;

  const corners = [...Array(6)].map((nada, index) => {
    const coordinates = hexCorner({
      index,
      offset: {
        x: 1 + random(radius, seed++),
        y: 1 + random(radius, seed++),
      },
    });
    return [coordinates.x, coordinates.y];
  });

  // Random points between corners
  const points = corners.reduce((points, corner, index) => {
    const pointCount = 1 + Math.floor(random(2, seed++));
    const nextCorner = corners[index];
    points.push(corner);

    let pointCounter = 0;
    let currentX = corner[0];
    let currentY = corner[1];

    while (pointCounter < pointCount) {
      const x =
        lerp(currentX, nextCorner[0], 1 / pointCount) *
        (1 + random(radius, seed++));
      const y =
        lerp(currentY, nextCorner[1], 1 / pointCount) *
        (1 + random(radius, seed++));
      points.push([x, y]);
      currentX = x;
      currentY = y;
      pointCounter++;
    }

    return points;
  }, []);

  return points;

  // const cornerDirections = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  // const lineDirections = [[1, 0], [0, 1], [-1, 0], [0, -1]];
  //
  // const corners = cornerDirections
  //   .map(direction => [
  //     // Spread into rectangle
  //     direction[0] * baseCoordinate,
  //     direction[1] * baseCoordinate,
  //   ])
  //   .map((corner, index) => [
  //     // Push corners
  //     corner[0] + radius * cornerDirections[index][0] * random(1, seed++),
  //     corner[1] + radius * cornerDirections[index][1] * random(1, seed++),
  //   ]);
  //
  // // Add randomly offset points along the edges
  // const shape = corners.reduce((points, corner, cornerIndex) => {
  //   points.push(corner);
  //   const pointCount = 2 + Math.floor(random(5, seed++));
  //
  //   const pointsAlongLine = [...Array(pointCount)].map((nada, index) => {
  //     const alongLine = hexSize / pointCount * index + 1;
  //     const away = random(radius, seed++);
  //     const x = lineDirections[cornerIndex][0]
  //       ? alongLine * lineDirections[cornerIndex][0]
  //       : away * cornerDirections[cornerIndex][0];
  //     const y = lineDirections[cornerIndex][1]
  //       ? alongLine * lineDirections[cornerIndex][1]
  //       : away * cornerDirections[cornerIndex][1];
  //
  //     return [corner[0] + x, corner[1] + y];
  //   });
  //
  //   return points.concat(pointsAlongLine);
  // }, []);
};

export { config, lerp, random, getSeed, baseTile };
