import React from "react";

import LogMessage from "./LogMessage";
import FirebaseUser from "./FirebaseUser";
import Firebase from "./Firebase";
import Region from "./Region";

const ReturningPlayer = () => (
  <FirebaseUser>
    {({ userID }) => (
      <Firebase
        query={{
          online: ".info/connected",
        }}
      >
        {({ online }) => (
          <React.Fragment>
            {/* {!online && <LogMessage>Offline, connecting to database… </LogMessage>} */}
            <LogMessage>
              Returning player experience not completed yet
            </LogMessage>
            {/* <Region /> */}
          </React.Fragment>
        )}
      </Firebase>
    )}
  </FirebaseUser>
);

export default ReturningPlayer;
