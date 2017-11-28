import React from "react";

import Location from "./Location";
import Units from "./Units";
import { getNeighbours, rules } from "../shared/helpers.js";
import { config } from "../graphics.js";

export default class Vision extends React.Component {
  render() {
    const { vision, userID } = this.props;

    const locations = vision
      ? Object.keys(vision).map(locationID => {
          const [x, y] = locationID.split(",");
          // const visibleNeighbours = getNeighbours(vision, x, y).reduce(
          //   (locations, { x, y, visible }) => {
          //     locations[`${x},${y}`] =
          //       x === rules.areaWidth - 1 || x === 0 ? false : visible;
          //     return locations;
          //   },
          //   {}
          // );

          return {
            locationID: locationID,
            x: +x,
            y: +y,
            trueSight: vision[locationID].trueSight,
            // neighbourVisibleN: visibleNeighbours[`${+x + 0},${+y - 1}`],
            // neighbourVisibleE: visibleNeighbours[`${+x + 1},${+y + 0}`],
            // neighbourVisibleS: visibleNeighbours[`${+x + 0},${+y + 1}`],
            // neighbourVisibleW: visibleNeighbours[`${+x - 1},${+y + 0}`],
            // neighbourVisibleNW: visibleNeighbours[`${+x - 1},${+y - 1}`],
            // neighbourVisibleNE: visibleNeighbours[`${+x + 1},${+y - 1}`],
            // neighbourVisibleSE: visibleNeighbours[`${+x + 1},${+y + 1}`],
            // neighbourVisibleSW: visibleNeighbours[`${+x - 1},${+y + 1}`],
          };
        })
      : [];

    const visionEdges = locations.reduce(
      (edges, location) => {
        edges.min =
          edges.min !== undefined
            ? Math.min(edges.min, location.y)
            : location.y;
        edges.max =
          edges.max !== undefined
            ? Math.max(edges.max, location.y)
            : location.y;
        return edges;
      },
      { min: undefined, max: undefined }
    );

    const visionLength = visionEdges.max - visionEdges.min + 1;

    return (
      <div
        className="vision"
        style={{
          "--worldWidth": rules.worldWidth,
          "--visionMin": visionEdges.min,
          "--visionMax": visionEdges.max,
          "--visionLength": visionLength,
          "--tileSize": 100 / rules.worldWidth,
          "--waterLevel": config.waterLevel,
          "--groundLevel": config.groundLevel,
          "--shroudLevel": config.shroudLevel,
        }}
      >
        <div className="locations" key="locations">
          {locations.map(location => (
            <Location key={location.locationID} {...location} userID={userID} />
          ))}
        </div>
        <Units key="Units" {...this.props} />
      </div>
    );
  }
}
