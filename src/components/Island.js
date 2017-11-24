import React from "react";

import { listTilesInRange } from "../shared/helpers.js";

const getTile = (locations, x, y) =>
  (locations[x] && locations[x][y] && locations[x][y].tile) || {
    type: "land",
  };

const isTileVisible = (visibleTiles, x, y) =>
  visibleTiles[x] && visibleTiles[x][y];

const getNeighbours = (visibleTiles, x, y, areaLength) => {
  return listTilesInRange({
    x: x,
    y: y,
    range: 1,
    diagonal: true,
    areaLength: areaLength,
  }).map(tile => {
    return {
      x: tile.x,
      y: tile.y,
      visible: !!isTileVisible(visibleTiles, tile.x, tile.y),
    };
  });
};

export default class Island extends React.Component {
  render() {
    const { gameState, visibleTiles } = this.props;

    const tiles = Object.keys(visibleTiles)
      .reduce((tiles, x) => {
        return tiles.concat(
          Object.keys(visibleTiles[x]).map(y => {
            return {
              ...getTile(gameState.locations, x, y),
              x: +x,
              y: +y,
              shoreVisible:
                listTilesInRange({
                  x: +x,
                  y: +y,
                  areaLength: gameState.details.areaLength,
                }).reduce((count, tile) => {
                  return getTile(gameState.locations, tile.x, tile.y).type ===
                    "water"
                    ? count + 1
                    : count;
                }, 0) > 0,
            };
          })
        );
      }, [])
      .filter(tile => tile.type);

    const units = Object.keys(visibleTiles)
      .reduce((units, x) => {
        return units.concat(
          Object.keys(visibleTiles[x]).map(y => {
            const unit =
              gameState.locations[x] &&
              gameState.locations[x][y] &&
              gameState.locations[x][y].unit;

            return {
              ...unit,
              x: +x,
              y: +y,
            };
          })
        );
      }, [])
      .filter(unit => unit.unitID);

    const shroudList = tiles.reduce((shrouds, { x, y }) => {
      getNeighbours(visibleTiles, x, y, gameState.details.areaLength)
        .filter(tile => !tile.visible)
        .forEach(({ x, y }) => {
          shrouds[x] = shrouds[x] || {};
          shrouds[x][y] = true;
        });

      return shrouds;
    }, {});

    const shrouds = Object.keys(shroudList).reduce((shrouds, x) => {
      return shrouds.concat(
        Object.keys(shroudList[x]).map(y => {
          return {
            x: +x,
            y: +y,
          };
        })
      );
    }, []);

    // const { tiles, units, shrouds, areaLength } = this.props;

    // return [
    //   tiles &&
    //     tiles.map(tile => (
    //       <Tile
    //         key={`${tile.x},${tile.y}`}
    //         x={tile.x}
    //         y={tile.y}
    //         areaLength={areaLength}
    //         {...tile}
    //       />
    //     )),
    //   units &&
    //     units.map(
    //       unit =>
    //         unit ? (
    //           <Unit
    //             key={`${unit.x},${unit.y}`}
    //             x={unit.x}
    //             y={unit.y}
    //             areaLength={areaLength}
    //             {...unit}
    //           />
    //         ) : null
    //     ),
    //   shrouds &&
    //     shrouds.map(shroud => (
    //       <Shroud
    //         key={`${shroud.x},${shroud.y}`}
    //         areaLength={areaLength}
    //         {...shroud}
    //       />
    //     )),
    // ];

    // return (
    //   <div
    //     className="locations"
    //     style={{
    //       "--tileSize": 100 / rules.areaWidth,
    //       "--areaLength": areaLength,
    //       "--areaWidth": rules.areaWidth,
    //       "--waterLevel": config.waterLevel,
    //       "--groundLevel": config.groundLevel,
    //       "--shroudLevel": config.shroudLevel,
    //     }}
    //   >
    //     <div className="locationSizer">{children}</div>
    //   </div>
    // );

    // return (
    //   <Clock
    //     {...this.props}
    //     tiles={tiles}
    //     units={units}
    //     shrouds={shrouds}
    //     startedAt={gameState.details.startedAt}
    //     areaLength={gameState.details.areaLength}
    //     player={gameState.players[singlePlayerUserID]}
    //     userID={singlePlayerUserID}
    //   />
    // );

    return null;
  }
}
