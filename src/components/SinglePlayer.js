import React, { Component } from "react";
import Clock from "./Clock";
import {
  rules,
  getFreshGameState,
  addPlayerToGameState,
  singlePlayerUserID,
} from "../shared/helpers.js";

const getNeighbour = (visibleTiles, x, y, xOffset, yOffset) => {
  return visibleTiles[x + xOffset] && visibleTiles[x + xOffset][y + yOffset]
    ? true
    : false;
};

const getNeighbours = (visibleTiles, x, y) => {
  const directions = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];

  return directions.map(direction => {
    return {
      x: x + direction[0],
      y: y + direction[1],
      empty: !getNeighbour(visibleTiles, x, y, direction[0], direction[1]),
    };
  });
};

export default class SinglePlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commands: {},
      gameState: addPlayerToGameState(
        {
          playerID: singlePlayerUserID,
          startingX: Math.floor(Math.random() * rules.worldWidth),
        },
        getFreshGameState(Date.now())
      ),
    };
  }

  render() {
    const gameState = this.state.gameState;
    const { visibleTiles } = gameState.players[singlePlayerUserID];

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
        // Doesn't take into account world length
        .filter(
          neighbour =>
            neighbour.empty &&
            neighbour.x >= 0 &&
            neighbour.x < rules.worldWidth &&
            neighbour.y >= 0
        )
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
        commands={this.state.commands}
        startedAt={gameState.details.startedAt}
        playerCount={gameState.details.playerCount}
        player={gameState.players[singlePlayerUserID]}
        userID={singlePlayerUserID}
      />
    );
  }
}
