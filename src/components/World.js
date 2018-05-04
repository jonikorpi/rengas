import React from "react";

const computeRegionSize = (region, isActive) => {
  const xSize = region[1].x - region[0].x + 1;
  const ySize = region[1].y - region[0].y + 1;
  const isVertical = xSize < ySize;
  const width = isVertical || (!isVertical && !isActive) ? xSize : ySize;
  const height = isVertical || (!isVertical && !isActive) ? ySize : xSize;

  return { width, height };
};

const createGrid = (x = 3, y = 3) =>
  Array(y)
    .fill(undefined)
    .map(() => Array(x).fill(undefined));

const regions = {
  first: {
    0: { x: 2, y: 3, z: 0 },
    1: { x: 9, y: 34, z: 0 },
    connections: {
      second: true,
    },
  },
  second: {
    0: { x: 10, y: 5, z: 0 },
    1: { x: 34, y: 13, z: 0 },
    connections: {
      first: true,
    },
  },
};

class World extends React.Component {
  state = { x: 2, y: 5, region: Object.keys(regions)[0] };
  handleClick = (x, y, id) => this.setState({ x: x, y: y, region: id });

  render() {
    const { x, y, region } = this.state;
    const activeRegion = regions[region];
    const activeRegionProps = computeRegionSize(activeRegion, true);

    return (
      <div className="backdrop">
        <div
          className="gridContainer"
          style={{
            "--activeGridWidth": activeRegionProps.width,
            "--activeGridHeight": activeRegionProps.height,
          }}
        >
          <Region
            {...activeRegionProps}
            id={region}
            origoX={activeRegion[0].x}
            origoY={activeRegion[0].y}
            isActive={true}
            handleClick={this.handleClick}
          >
            <Player x={x - activeRegion[0].x} y={y - activeRegion[0].y} />
          </Region>

          {Object.keys(activeRegion.connections).map(regionID => (
            <Region
              key={regionID}
              id={regionID}
              {...computeRegionSize(regions[regionID])}
              origoX={regions[regionID][0].x}
              origoY={regions[regionID][0].y}
              offsetX={regions[regionID][0].x - activeRegion[0].x}
              offsetY={regions[regionID][0].y - activeRegion[0].y}
              handleClick={this.handleClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

const Region = ({
  children,
  id,
  width,
  height,
  isActive = false,
  handleClick,
  origoX = 0,
  origoY = 0,
  offsetX = 0,
  offsetY = 0,
}) => {
  return (
    <div
      className={`grid ${isActive ? "isActive" : "notActive"}`}
      onClick={this.moveTo}
      style={{
        "--gridWidth": width,
        "--gridHeight": height,
        "--offsetX": offsetX,
        "--offsetY": offsetY,
      }}
    >
      {createGrid(width, height).map((row, y) =>
        row.map((seed, x) => (
          <div
            className="static"
            // style={{ "--x": x, "--y": y }}
            key={`${x},${y}`}
          >
            <button
              type="button"
              className="tileButton"
              onClick={({ nativeEvent: { offsetX, offsetY, target } }) => {
                const rectangle = target.getBoundingClientRect();
                const xOffset = offsetX / rectangle.width;
                const yOffset = offsetY / rectangle.height;

                return handleClick(
                  origoX + x + xOffset - 0.5,
                  origoY + y + yOffset - 0.5,
                  id
                );
              }}
            >
              {origoX + x},{origoY + y}
            </button>
          </div>
        ))
      )}

      {children}
    </div>
  );
};

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
