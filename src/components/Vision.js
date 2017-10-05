import React from "react";
import Tile from "./Tile";
import Unit from "./Unit";
import Shroud from "./Shroud";

export default class Vision extends React.Component {
  render() {
    const { tiles, units, shrouds, areaLength } = this.props;

    return [
      tiles &&
        tiles.map(tile => (
          <Tile
            key={`${tile.x},${tile.y}`}
            x={tile.x}
            y={tile.y}
            areaLength={areaLength}
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
                areaLength={areaLength}
                {...unit}
              />
            ) : null
        ),
      shrouds &&
        shrouds.map(shroud => (
          <Shroud
            key={`${shroud.x},${shroud.y}`}
            areaLength={areaLength}
            {...shroud}
          />
        )),
    ];
  }
}
