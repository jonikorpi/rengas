import React from "react";

import SVG from "./SVG";
import Graphic from "./Graphic";

const TileType = ({ type, baseTile }) => {
  switch (type) {
    default:
    case "plains":
      return [
        <SVG z={-3} zIndex={-4}>
          <Graphic type="waterLine" points={baseTile} />
        </SVG>,

        <SVG z={-3}>
          <Graphic type="ground" fill="#333" points={baseTile} />
        </SVG>,

        <SVG z={-2}>
          <Graphic type="ground" fill="#666" points={baseTile} />
        </SVG>,

        <SVG z={-1}>
          <Graphic type="ground" fill="#999" points={baseTile} />
        </SVG>,

        <SVG>
          <Graphic type="ground" fill="#fff" points={baseTile} />
        </SVG>,
      ];

    // case "water":
    //   return (
    //     <polygon
    //       points={points}
    //       {...defaults}
    //       fill={fill || "var(--white)"}
    //       stroke={stroke || "var(--white)"}
    //       strokeWidth={strokeWidth || "2.5%"}
    //     />
    //   );
  }
};

export default TileType;
