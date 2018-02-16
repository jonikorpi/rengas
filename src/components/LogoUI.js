import React from "react";
import firebase from "firebase/app";
import "firebase/database";

export default class LogoUI extends React.PureComponent {
  concede = () => {
    firebase
      .database()
      .ref(`players/${this.props.userID}/commands`)
      .push({ action: "concede", time: Date.now(), processed: false });
  };

  render() {
    return (
      <div className="logoUI">
        <button onClick={this.concede}>Abandon game</button>
      </div>
    );
  }
}
