import React, { Component } from "react";
import Network from "react-network";
import Game from "./Game";

export default class App extends Component {
  render() {
    return (
      <Network
        render={({ online }) => <Game userID={null} online={online} />}
      />
    );
  }
}
