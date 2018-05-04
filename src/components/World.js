import React from "react";

const createGrid = (x = 3, y = 3) =>
  Array(y)
    .fill(undefined)
    .map(() => Array(x).fill(undefined));

const regions = {
  first: {
    location: {
      x: 9,
      y: 1,
      z: 0,
      x2: 4,
      y2: 34,
      z2: 0,
    },
    connections: {
      second: true,
    },
  },
  second: {
    location: {
      x: 10,
      y: 1,
      z: 0,
      x2: 34,
      y2: 7,
      z2: 0,
    },
    connections: {
      first: true,
    },
  },
};

class World extends React.Component {
  state = { playerX: 0, playerY: 0, region: Object.keys(regions)[0] };
  handleClick = (x, y, id) =>
    this.setState({ playerX: x, playerY: y, region: id });

  render() {
    const { playerX, playerY, region } = this.state;
    const { x, y, x2, y2 } = regions[region].location;
    const worldShouldRotate = Math.abs(x2 - x) > Math.abs(y2 - y);
    const worldWidth =
      (worldShouldRotate ? Math.abs(y2 - y) : Math.abs(x2 - x)) + 1;
    const worldHeight =
      (worldShouldRotate ? Math.abs(x2 - x) : Math.abs(y2 - y)) + 1;
    const origoX = worldShouldRotate ? Math.max(x2, x) : Math.min(x2, x);
    const origoY = Math.min(y2, y);

    return (
      <div className="backdrop">
        <div
          className="gridContainer"
          style={{
            "--activeGridWidth": worldWidth,
            "--activeGridHeight": worldHeight,
          }}
        >
          <Region
            id={region}
            {...regions[region].location}
            isActive={true}
            shouldRotate={worldShouldRotate}
            handleClick={this.handleClick}
            origoX={origoX}
            origoY={origoY}
          />

          {Object.keys(regions[region].connections).map(regionID => {
            return (
              <Region
                key={regionID}
                id={regionID}
                {...regions[regionID].location}
                shouldRotate={worldShouldRotate}
                handleClick={this.handleClick}
                origoX={origoX}
                origoY={origoY}
              />
            );
          })}

          <Player
            x={playerX}
            y={playerY}
            shouldRotate={worldShouldRotate}
            origoX={origoX}
            origoY={origoY}
          />
        </div>
      </div>
    );
  }
}

const Region = ({
  children,
  id,
  isActive,
  handleClick,
  shouldRotate,
  x,
  y,
  z,
  x2,
  y2,
  z2,
  origoX,
  origoY,
}) => {
  const width = Math.abs(x2 - x) + 1;
  const height = Math.abs(y2 - y) + 1;
  const globalOrigoX = Math.min(x, x2);
  const globalOrigoY = Math.min(y, y2);

  const localWidth = shouldRotate ? height : width;
  const localHeight = shouldRotate ? width : height;
  const localOrigoX = shouldRotate ? Math.max(x2, x) : Math.min(x2, x);
  const localOrigoY = Math.min(y2, y);

  return (
    <div
      className={`grid ${isActive ? "isActive" : "notActive"}`}
      onClick={this.moveTo}
      style={{
        "--gridWidth": localWidth,
        "--gridHeight": localHeight,
        "--offsetX": shouldRotate ? localOrigoY - origoY : localOrigoX - origoX,
        "--offsetY": shouldRotate
          ? (localOrigoX - origoX) * -1
          : localOrigoY - origoY,
      }}
    >
      {createGrid(width, height).map((row, y) =>
        row.map((seed, x) => {
          const localX = shouldRotate ? y : x;
          const localY = shouldRotate ? width - x - 1 : y;

          return (
            <div
              className="static"
              style={{ "--x": localX, "--y": localY }}
              key={`${x},${y}`}
            >
              <button
                type="button"
                className="tileButton"
                onClick={({ nativeEvent: { offsetX, offsetY, target } }) => {
                  const rectangle = target.getBoundingClientRect();
                  const xOffset = shouldRotate
                    ? -(offsetY / rectangle.height) + 0.5
                    : offsetX / rectangle.width - 0.5;
                  const yOffset = shouldRotate
                    ? offsetX / rectangle.width - 0.5
                    : offsetY / rectangle.height - 0.5;

                  return handleClick(
                    globalOrigoX + x + xOffset,
                    globalOrigoY + y + yOffset,
                    id
                  );
                }}
              >
                {globalOrigoX + x},{globalOrigoY + y}
              </button>
            </div>
          );
        })
      )}

      {children}
    </div>
  );
};

const Player = ({ x, y, shouldRotate, origoX, origoY }) => {
  const localX = shouldRotate ? y - origoY : x - origoX;
  const localY = shouldRotate ? origoX - x : y - origoY;

  return (
    <React.Fragment>
      <div
        className="dynamic"
        style={{ "--x": localX, "--y": localY, "--z": 2, color: "yellow" }}
      >
        P
      </div>
      <div
        className="dynamic"
        style={{ "--x": localX, "--y": localY, "--z": 1, color: "orange" }}
      >
        P
      </div>
      <div
        className="dynamic"
        style={{ "--x": localX, "--y": localY, color: "red" }}
      >
        P
      </div>
    </React.Fragment>
  );
};

export default World;
