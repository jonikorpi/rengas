import React from "react";

import Clock from "./Clock";
import {
  rules,
  singlePlayerUserID,
  listTilesInRange,
} from "../shared/helpers.js";

const getTile = (locations, x, y) =>
  (locations[x] && locations[x][y] && locations[x][y].tile) || {
    type: "water",
  };

const isTileVisible = (visibleTiles, x, y) =>
  visibleTiles[x] && visibleTiles[x][y];

const getNeighbours = (visibleTiles, x, y) => {
  return (
    listTilesInRange({ x: x, y: y, range: 1.5 })
      .map(tile => {
        return {
          x: tile.x,
          y: tile.y,
          visible: !!isTileVisible(visibleTiles, tile.x, tile.y),
        };
      })
      // Doesn't take into account area length
      .filter(tile => tile.x >= 0 && tile.x < rules.areaWidth && tile.y >= 0)
  );
};

export default class Area extends React.Component {
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
                listTilesInRange({ x: +x, y: +y }).reduce((count, tile) => {
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
      getNeighbours(visibleTiles, x, y)
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

    return (
      <Clock
        {...this.props}
        tiles={tiles}
        units={units}
        shrouds={shrouds}
        startedAt={gameState.details.startedAt}
        areaLength={gameState.details.areaLength}
        player={gameState.players[singlePlayerUserID]}
        userID={singlePlayerUserID}
      />
    );
  }
}
