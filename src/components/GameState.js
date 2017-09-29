import React, { Component } from "react";

import Clock from "./Clock";
import {
  rules,
  getFreshGameState,
  addPlayerToGameState,
  singlePlayerUserID,
  listTilesInRange,
} from "../shared/helpers.js";

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
      // Doesn't take into account world length
      .filter(tile => tile.x >= 0 && tile.x < rules.worldWidth && tile.y >= 0)
  );
};

export default class SinglePlayer extends Component {
  render() {
    const { gameState, visibleTiles } = this.props;

    const tiles = Object.keys(visibleTiles)
      .reduce((tiles, x) => {
        return tiles.concat(
          Object.keys(visibleTiles[x]).map(y => {
            const tile = (gameState.world[x] &&
              gameState.world[x][y] &&
              gameState.world[x][y].tile) || {
                type: "water",
              };

            return {
              ...tile,
              x: +x,
              y: +y,
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
              gameState.world[x] &&
              gameState.world[x][y] &&
              gameState.world[x][y].unit;

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
        playerCount={gameState.details.playerCount}
        player={gameState.players[singlePlayerUserID]}
        userID={singlePlayerUserID}
      />
    );
  }
}
