import React from "react";

// import AuthUI from "./AuthUI";
import Region from "./Region";
import LimboTiles from "./LimboTiles";
import LimboPlayer from "./LimboPlayer";
import Tile from "./Tile";
import Entity from "./Entity";
import CameraTarget from "./CameraTarget";

const NewPlayer = setHasPlayedBefore => (
  <React.Fragment>
    <div className="world">
      <Region>
        <LimboTiles>
          {(tiles, width, height) => (
            <LimboPlayer tiles={tiles} width={width} height={height}>
              {(player, handleMovement) => (
                <React.Fragment>
                  <div
                    className="statics"
                    style={{ "--width": width, "--height": height }}
                  >
                    {tiles.map(tile => (
                      <Tile
                        key={`${tile.x},${tile.y}`}
                        {...tile}
                        handleMovement={handleMovement}
                      />
                    ))}
                  </div>

                  <div className="dynamics">
                    <Entity {...player}>
                      <CameraTarget region={player.region} />
                    </Entity>
                  </div>
                </React.Fragment>
              )}
            </LimboPlayer>
          )}
        </LimboTiles>
      </Region>
    </div>

    {/* Sparse onboarding tutorial */}
    {/* <AuthUI/> */}
  </React.Fragment>
);

export default NewPlayer;
