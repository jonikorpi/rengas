import React from "react";

import { random } from "../utilities/helpers.js";

const Tile = ({ children, x = 0, y = 0, impassable }) => {
  return (
    <div
      className="static"
      style={{
        "--x": x,
        "--y": y,
      }}
    >
      {!impassable && (
        <button
          type="button"
          className="tile-button"
          title={`${x},${y}`}
          // onClick={({ nativeEvent: { offsetX, offsetY, target } }) => {
          //   const rectangle = target.getBoundingClientRect();
          //   const xOffset = offsetX / rectangle.width - 0.5;
          //   const yOffset = offsetY / rectangle.height - 0.5;
          //   return handleClick(x + xOffset, y + yOffset, id);
          // }}
        >
          {x},{y}
        </button>
      )}

      {children}
    </div>
  );
};

export default Tile;
