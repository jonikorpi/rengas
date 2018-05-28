import React from "react";

import { random, createGrid } from "../utilities/helpers.js";

const entities = {
  $entityID: {
    state: {
      speed: 1,
      vision: 5,
      stealth: 0,
      x: 0,
      y: 0,
      z: 0,
      exactX: 0,
      exactY: 0,
    },
    movingTo: {
      since: Date.now(),
      speed: 1, // must match state.speed * currentTile.speedModifier
      x: 0,
      y: 0,
      z: 0,
      exactX: 0, // (exactX - x < 1 || > -1)
      exactY: 0, // (exactY - y < 1 || > -1)
      validate: `
        entity is already here
        || regions/$regionID/x,y must exist and not be impassable
          && z - ownZ === 0
            || z - ownZ + zModifier + ownTile.zModifier === 0
      `,
    },
    read: `
      uid === entityID
      || (x - readerX) + (y - readerY) + (z - readerZ) 
        <= (readerRange - tile.stealth - entity.stealth) 
        || <= (-readerRange + tile.stealth + entity.stealth)
    `,
  },
};

const regions = {
  $regionID: {
    tiles: {
      read: `in same region`,
      "x,y": {
        impassable: null,
        stealth: null,
        z: 0,
        zModifier: 1, // = ramp upwards
      },
    },
    entities: {
      "x,y": {
        read: `
          (x - readerX) + (y - readerY) + (z - readerZ) 
            <= (readerRange - tile.stealth - entity.stealth) 
              || <= (-readerRange + tile.stealth + entity.stealth)
        `,
        $entityID: true,
      },
    },
    stealthEntities: {
      "x,y": {
        read: `
          (x - readerX) + (y - readerY) + (z - readerZ) 
            <= 1 && <= -1
        `,
        $entityID: true,
      },
    },
  },
};

const regions = [...Array(4)].reduce((regions, v, regionID) => {
  regions[regionID] = {
    tiles: createGrid(8, Math.round(8 + random(26, regionID))),
  };
  return regions;
}, {});

class World extends React.Component {
  state = { playerX: 5, playerY: 2, region: Object.keys(regions)[2] };
  handleClick = (x, y, id) =>
    this.setState({ playerX: x, playerY: y, region: id });

  render() {
    const { playerX, playerY, region } = this.state;

    return (
      <div className="world">
        <Region
          id={region}
          {...regions[region].location}
          shouldRotate={true}
          handleClick={this.handleClick}
        >
          {(origoX, origoY, rotated, width) => (
            <Player
              x={rotated ? playerY - origoY : playerX - origoX}
              y={rotated ? width - (playerX - origoX) - 1 : playerY - origoY}
              region={region}
              focusOnRegionChanges={true}
            />
          )}
        </Region>
      </div>
    );
  }
}

const Region = ({
  children,
  id,
  handleClick,
  shouldRotate = false,
  x = 0,
  y = 0,
  z = 0,
  x2 = 3,
  y2 = 3,
  z2 = 0,
}) => {
  const rotate = shouldRotate && Math.abs(x2 - x) > Math.abs(y2 - y);
  const origoX = Math.min(x2, x);
  const origoY = Math.min(y2, y);

  const realWidth = Math.abs(x2 - x) + 1;
  const realHeight = Math.abs(y2 - y) + 1;
  const width = rotate ? realHeight : realWidth;
  const height = rotate ? realWidth : realHeight;

  return (
    <div
      className="region"
      onClick={this.moveTo}
      style={{
        "--width": width,
        "--height": height,
      }}
    >
      <div className="statics">
        {createGrid(realWidth, realHeight).map((row, y) =>
          row.map((seed, x) => {
            const localX = rotate ? y : x;
            const localY = rotate ? realWidth - x - 1 : y;
            const globalX = origoX + x;
            const globalY = origoY + y;
            const isWall = random(1, globalX * globalY * globalY) > 0.875;

            return (
              <div
                className="static"
                style={{
                  "--x": localX,
                  "--y": localY,
                  backgroundColor: isWall ? "grey" : "hsl(0,0%, 23.6%)",
                }}
                key={`${x},${y}`}
              >
                {!isWall && (
                  <button
                    type="button"
                    className="tile-button"
                    title={`${globalX},${globalY}`}
                    onClick={({
                      nativeEvent: { offsetX, offsetY, target },
                    }) => {
                      const rectangle = target.getBoundingClientRect();
                      const xOffset = rotate
                        ? -(offsetY / rectangle.height) + 0.5
                        : offsetX / rectangle.width - 0.5;
                      const yOffset = rotate
                        ? offsetX / rectangle.width - 0.5
                        : offsetY / rectangle.height - 0.5;

                      return handleClick(
                        globalX + xOffset,
                        globalY + yOffset,
                        id
                      );
                    }}
                  >
                    {globalX},{globalY}
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="dynamics">
        {children(origoX, origoY, rotate, realWidth, realHeight)}
      </div>
    </div>
  );
};

class Player extends React.Component {
  componentDidMount() {
    this.scrollToPlayer();
  }

  componentDidUpdate({ region, focusOnRegionChanges }) {
    if (focusOnRegionChanges && region !== this.props.region) {
      this.scrollToPlayer();
    }
  }

  scrollToPlayer = () => {
    const dimensions = this.element.getBoundingClientRect();
    const y =
      window.pageYOffset +
      dimensions.top +
      dimensions.height / 2 -
      window.innerHeight / 2;
    window.scrollTo(0, y);
  };

  render() {
    const { x, y } = this.props;

    return (
      <React.Fragment>
        <div
          ref={ref => {
            this.element = ref;
          }}
          className="dynamic flex justify-center align-center"
          style={{ "--x": x, "--y": y, "--z": 2, color: "yellow" }}
        >
          P
        </div>
        <div
          className="dynamic flex justify-center align-center"
          style={{ "--x": x, "--y": y, "--z": 1, color: "orange" }}
        >
          P
        </div>
        <div
          className="dynamic flex justify-center align-center"
          style={{ "--x": x, "--y": y, color: "red" }}
        >
          P
        </div>
      </React.Fragment>
    );
  }
}

export default World;
