import React from "react";
// import { Persist } from "react-persist";

import NewPlayer from "./NewPlayer";
import * as ReturningPlayer from "./NewPlayer";

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
        {hasPlayedBefore ? (
          <ReturningPlayer />
        ) : (
          <NewPlayer setHasPlayedBefore={this.setHasPlayedBefore} />
        )}
        {/* <Persist
          name="hasPlayedBefore"
          data={hasPlayedBefore}
          onMount={hasPlayedBefore =>
            this.setState({ hasPlayedBefore: hasPlayedBefore })
          }
        /> */}
      </React.Fragment>
    );
  }
}

export default App;
