import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";
import { config } from "../graphics.js";

const TileType = ({ type, baseTile, seed }) => {
  let key = 0;

  switch (type) {
    default:
    case "plains":
      return [
        <SVG
          key={key++}
          z={config.waterLevel}
          scale={2}
          zIndex={config.waterLevel - 1}
        >
          <Graphic type="waterLine" points={baseTile} />
        </SVG>,

        <SVG key={key++} z={config.waterLevel} scale={2}>
          <Graphic type="ground" fill="#333" points={baseTile} />
        </SVG>,

        <SVG key={key++} z={config.waterLevel + 1} scale={1}>
          <Graphic type="ground" fill="#999" points={baseTile} />
        </SVG>,

        <SVG key={key++} z={config.groundLevel}>
          <Graphic type="ground" fill="#fff" points={baseTile} />
        </SVG>,
      ];

    case "water":
      return (
        <SVG zIndex={config.waterLevel - 2} scale={10}>
          <Graphic type="water" points={baseTile} />
        </SVG>
      );
  }
};

export default TileType;
