import React from "react";

import Location from "./Location";
import Shroud from "./Shroud";
import Units from "./Units";
import { getNeighbours, rules } from "../shared/helpers.js";
import { config } from "../graphics.js";

export default class Vision extends React.Component {
  render() {
    const { vision, userID } = this.props;

    let shroudMap = [];

    const locations = vision
      ? Object.keys(vision).map(locationID => {
          const [x, y] = locationID.split(",");

          const visibleNeighbours = getNeighbours(vision, +x, +y).filter(
            ({ x, y, visible }) => {
              if (!visible) {
                shroudMap[`${x},${y}`] = {
                  locationID: `${x},${y}`,
                  x: x,
                  y: y,
                };
              }

              return visible;
            }
          );

          return {
            locationID: locationID,
            x: +x,
            y: +y,
            trueSight: !!vision[locationID].trueSight,
            shoreVisible: visibleNeighbours.length > 0,
          };
        })
      : [];

    const shrouds = Object.keys(shroudMap).map(locationID => {
      return shroudMap[locationID];
    });

    const halfShrouds = locations.filter(location => !location.trueSight);

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
        <div className="locations">
          {locations.map(location => (
            <Location key={location.locationID} {...location} userID={userID} />
          ))}

          {shrouds.map(shroud => (
            <Shroud key={shroud.locationID} {...shroud} />
          ))}
        </div>

        <div className="halfShrouds">
          {halfShrouds.map(shroud => (
            <Shroud key={shroud.locationID} {...shroud} />
          ))}
        </div>

        <Units key="Units" {...this.props} />
      </div>
    );
  }
}
