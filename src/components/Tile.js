import React from "react";
import { connect } from "react-firebase";

import TileType from "./TileType";
import { getSeed, baseTile, random } from "../graphics.js";

class Tile extends React.Component {
  constructor(props) {
    super(props);

    const { x, y } = props;

    this.seed = getSeed(x, y);
    this.baseTile = baseTile(this.seed++)
      .join(" ")
      .toString();
    this.random = random(1, this.seed++);
  }

  render() {
    const { x, y, shoreVisible, trueSight } = this.props;
    const tile = this.props.tile || { type: "water" };

    return (
      <div
        className="tile"
        style={{
          "--x": x,
          "--y": y,
          "--random": this.random,
        }}
      >
        <TileType
          {...tile}
          baseTile={this.baseTile}
          seed={this.seed}
          shoreVisible={shoreVisible}
        />
      </div>
    );
  }
}

export default connect((props, ref) => ({
  tile: `locations/${props.x},${props.y}/tile`,
}))(Tile);
