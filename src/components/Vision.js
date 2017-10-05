import React from "react";
import Tile from "./Tile";
import Unit from "./Unit";
import Shroud from "./Shroud";

export default class Vision extends React.Component {
  render() {
    const { tiles, units, shrouds, worldLength } = this.props;

    return [
      tiles &&
        tiles.map(tile => (
          <Tile
            key={`${tile.x},${tile.y}`}
            x={tile.x}
            y={tile.y}
            worldLength={worldLength}
            {...tile}
          />
        )),
      units &&
        units.map(
          unit =>
            unit ? (
              <Unit
                key={`${unit.x},${unit.y}`}
                x={unit.x}
                y={unit.y}
                worldLength={worldLength}
                {...unit}
              />
            ) : null
        ),
      shrouds &&
        shrouds.map(shroud => (
          <Shroud
            key={`${shroud.x},${shroud.y}`}
            worldLength={worldLength}
            {...shroud}
          />
        )),
    ];
  }
}
