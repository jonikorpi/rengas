import React from "react";

import { random, createGrid } from "../utilities/helpers.js";

const region = {
  length: 34,
  tiles: {
    $y: {
      read: `entities/uid/y - $y is within sane range`,
      $x: {
        // null = hole?
        // impassable: random(1, x * y * y) > 0.875,
        stealth: null,
        z: null,
        zModifier: 1, // = ramp upwards
      },
    },
  },
  entities: {
    $x: {
      $y: {
        read: `
        (x - readerX) + (y - readerY) + (z - readerZ) 
          <= (readerRange - tile.stealth) 
            || <= (-readerRange + tile.stealth)
      `,
        $entityID: {
          value: true,
          validate: "entities/uid/region,x,y match this one or null",
        },
      },
    },
  },
  stealthedEntities: {
    $x: {
      $y: {
        read: "(x - readerX) + (y - readerY) + (z - readerZ) <= 1 || <= -1",
        $entityID: {
          value: true,
          validate: "entities/uid/region,x,y match this one or null",
        },
      },
    },
  },
};

const width = 9;
const height = 34;
const tiles = createGrid(width, height).map(tile => ({
  ...tile,
  impassable: random(1, tile.x * tile.y * tile.y) > 0.875,
  // stealth: null,
  // z: null,
  // zModifier: null,
}));

const LimboTiles = ({ children, loadFrom, loadTo }) => {
  const visibleTiles = tiles.filter(
    tile =>
      tile.y >= Math.max(0, loadFrom) && tile.y <= Math.min(height - 1, loadTo)
  );

  // for (let index = loadFrom; index < loadTo; index++) {
  //   if (index < 0) {
  //     tiles
  //   }
  // }

  return children(visibleTiles, width, height);
};

export default LimboTiles;
