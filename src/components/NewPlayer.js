import React from "react";

// import AuthUI from "./AuthUI";
import LimboTiles from "./LimboTiles";
import LimboPlayer from "./LimboPlayer";
import Tile from "./Tile";
import Entity from "./Entity";
import CameraTarget from "./CameraTarget";

const NewPlayer = setHasPlayedBefore => (
  <React.Fragment>
    <div className="world">
      <div className="region">
        <LimboTiles>
          {(tiles, width, height) => (
            <div
              className="statics"
              style={{ "--width": width, "--height": height }}
            >
              {tiles.map(tile => <Tile {...tile} />)}
            </div>
          )}
        </LimboTiles>

        <div className="dynamics">
          <LimboPlayer>
            {player => (
              <Entity {...player}>
                <CameraTarget region={player.region} />
              </Entity>
            )}
          </LimboPlayer>
        </div>
      </div>
    </div>

    {/* Sparse onboarding tutorial */}
    {/* <AuthUI/> */}
  </React.Fragment>
);

export default NewPlayer;
