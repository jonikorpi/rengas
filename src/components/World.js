import React from "react";

const createGrid = (x = 3, y = 3) =>
  Array(y)
    .fill(undefined)
    .map(() => Array(x).fill(undefined));

const width = 8;
const height = 55;
const grid = createGrid(width, height);

const World = () => {
  return (
    <div className="backdrop">
      <div
        className="grid"
        style={{ "--gridWidth": width, "--gridHeight": height }}
      >
        {grid.map((row, y) =>
          row.map((seed, x) => (
            <div
              className="static"
              style={{ "--x": x, "--y": y }}
              key={`${x},${y}`}
              title={`${x},${y}`}
            />
          ))
        )}

        <div className="dynamic" style={{ "--x": 2, "--y": 5, "--z": 1 }}>
          P
        </div>
        <div className="dynamic" style={{ "--x": 2, "--y": 5, color: "red" }}>
          P
        </div>
      </div>
    </div>
  );
};

export default World;
