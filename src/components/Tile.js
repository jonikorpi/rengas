import React from "react";

const Tile = ({
  children,
  handleMovement,
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
            const xOffset = offsetX / rectangle.width - 0.5;
            const yOffset = offsetY / rectangle.height - 0.5;
            return handleMovement(x + xOffset, y + yOffset);
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
