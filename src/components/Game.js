import React from "react";

import LogMessage from "./LogMessage";
import FirebaseUser from "./FirebaseUser";
import Firebase from "./Firebase";
import World from "./World";

const Game = () => (
  // <FirebaseUser>
  //   {({ userID }) => (
  //     <Firebase
  //       query={{
  //         online: ".info/connected",
  //       }}
  //     >
  //       {({ online }) => (
  <React.Fragment>
    {/* {!online && <LogMessage>Offline, connecting to database… </LogMessage>} */}

    <World />
  </React.Fragment>
  //       )}
  //     </Firebase>
  //   )}
  // </FirebaseUser>
);

export default Game;
