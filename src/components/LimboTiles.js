import React from "react";

import { random, createGrid } from "../utilities/helpers.js";

const region = {
  tiles: {
    read: `in same region`,
    $x: {
      $y: {
        // null = hole
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
const tiles = createGrid(width, height);

const LimboTiles = ({ children }) => children(tiles, width, height);

export default LimboTiles;
