import React from "react";
// import { Persist } from "react-persist";

import FirebaseUser from "./FirebaseUser";
import Firebase from "./Firebase";
import LimboPlayer from "./LimboPlayer";
import LimboTiles from "./LimboTiles";
import Tile from "./Tile";
import Entity from "./Entity";
import CameraTarget from "./CameraTarget";

class App extends React.Component {
  state = {
    hasPlayedBefore: false,
  };

  setHasPlayedBefore = hasOrHasNot =>
    this.setState({ hasPlayedBefore: hasOrHasNot });

  render() {
    const { hasPlayedBefore } = this.state;

    return (
      <React.Fragment>
        {/* <Persist
          name="hasPlayedBefore"
          data={hasPlayedBefore}
          onMount={hasPlayedBefore =>
            this.setState({ hasPlayedBefore: hasPlayedBefore })
          }
        /> */}

        <User offline={!hasPlayedBefore}>
          {user => (
            <Player offline={!hasPlayedBefore}>
              {(player, handleMovement) => {
                // const centerTilesOn = player.state.position.y;
                // const tileVisionRange = 10;
                const entityVisionRange = 5;
                const inLimbo = !player.region;

                return (
                  <TileData
                    inLimbo={inLimbo}
                    // loadFrom={centerTilesOn - tileVisionRange}
                    // loadTo={centerTilesOn + tileVisionRange}
                  >
                    {(tiles, width, height) => {
                      const visibleTiles = [];

                      return (
                        <div className="world">
                          <div
                            className="region"
                            style={{
                              "--width": width,
                              "--height": height,
                            }}
                          >
                            <div className="statics">
                              {tiles.map(tile => (
                                <Tile
                                  key={`${tile.x},${tile.y}`}
                                  {...tile}
                                  visible={
                                    Math.abs(tile.x - player.state.position.x) +
                                      Math.abs(
                                        tile.y - player.state.position.y
                                      ) <=
                                    entityVisionRange
                                  }
                                  handleMovement={handleMovement}
                                />
                              ))}
                            </div>

                            <div className="dynamics">
                              <Entity {...player}>
                                <CameraTarget
                                  reCenterWhenThisChanges={
                                    player.region || null
                                  }
                                />
                              </Entity>
                              <EntityLoader inLimbo={inLimbo}>
                                {foundEntities =>
                                  foundEntities.map(entityID => (
                                    <Firebase>
                                      {entity => <Entity {...entity} />}
                                    </Firebase>
                                  ))
                                }
                              </EntityLoader>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  </TileData>
                );
              }}
            </Player>
          )}
        </User>

        {/* Sparse onboarding tutorial */}
        {/* <AuthUI/> */}
      </React.Fragment>
    );
  }
}

const User = ({ offline = false, children }) =>
  offline ? (
    children({})
  ) : (
    <FirebaseUser>{user => children(user)}</FirebaseUser>
  );

const Player = ({ offline = false, children }) =>
  offline ? (
    <LimboPlayer>{children}</LimboPlayer>
  ) : (
    <Firebase
      query={{
        online: ".info/connected",
      }}
    >
      {data => children(data, () => {})}
    </Firebase>
  );

const EntityLoader = ({ inLimbo, children }) =>
  inLimbo ? children([]) : <Firebase>{children}</Firebase>;

const TileData = ({ inLimbo, loadFrom, loadTo, children }) =>
  inLimbo ? (
    <LimboTiles loadFrom={loadFrom} loadTo={loadTo}>
      {children}
    </LimboTiles>
  ) : (
    <Firebase>{children}</Firebase>
  );

export default App;
