import React from "react";

const createGrid = (x = 3, y = 3) =>
  Array(y)
    .fill(undefined)
    .map(() => Array(x).fill(undefined));

const width = 8;
const height = 55;
const grid = createGrid(width, height);

class World extends React.Component {
  state = { x: 2, y: 5 };

  render() {
    const { x, y } = this.state;
    return (
      <div className="backdrop">
        <div
          className="grid"
          style={{ "--gridWidth": width, "--gridHeight": height }}
          onClick={this.moveTo}
        >
          {grid.map((row, y) =>
            row.map((seed, x) => (
              <div
                className="static"
                style={{ "--x": x, "--y": y }}
                key={`${x},${y}`}
                title={`${x},${y}`}
              >
                <button
                  type="button"
                  className="tileButton"
                  onClick={({ nativeEvent: { offsetX, offsetY, target } }) => {
                    const xOffset =
                      offsetX / target.getBoundingClientRect().width;
                    const yOffset =
                      offsetY / target.getBoundingClientRect().height;

                    return this.setState({
                      x: x + xOffset - 0.5,
                      y: y + yOffset - 0.5,
                    });
                  }}
                />
              </div>
            ))
          )}

          <Player x={x} y={y} />
        </div>
      </div>
    );
  }
}

const Player = ({ x, y }) => {
  return (
    <React.Fragment>
      <div
        className="dynamic"
        style={{ "--x": x, "--y": y, "--z": 2, color: "yellow" }}
      >
        P
      </div>
      <div
        className="dynamic"
        style={{ "--x": x, "--y": y, "--z": 1, color: "orange" }}
      >
        P
      </div>
      <div className="dynamic" style={{ "--x": x, "--y": y, color: "red" }}>
        P
      </div>
    </React.Fragment>
  );
};

export default World;
