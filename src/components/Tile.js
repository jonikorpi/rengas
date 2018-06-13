import React from "react";

const Tile = ({
  children,
  headTowards,
  x = 0,
  y = 0,
  impassable = false,
  visible = false,
}) => {
  return (
    <div
      className={`static ${visible ? "visible" : "not-visible"}`}
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
          onClick={({ nativeEvent: { offsetX, offsetY, target } }) => {
            const rectangle = target.getBoundingClientRect();
            const xOffset = offsetX / rectangle.width;
            const yOffset = offsetY / rectangle.height;
            return headTowards(x + xOffset, y + yOffset);
          }}
        >
          {x},{y}
        </button>
      )}

      {children}
    </div>
  );
};

export default Tile;
