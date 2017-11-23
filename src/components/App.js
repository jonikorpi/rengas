import React from "react";
import Network from "react-network";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import Game from "./Game";

const isDevelopment = process.env.NODE_ENV === "development";

firebase.initializeApp(
  isDevelopment
    ? {
        apiKey: "AIzaSyDqIGRAAyuqUkwcoNrow1sfCc9IoUvfQUc",
        authDomain: "scrollworld-dev.firebaseapp.com",
        databaseURL: "https://scrollworld-dev.firebaseio.com",
        projectId: "scrollworld-dev",
      }
    : {
        apiKey: "AIzaSyBROe3cnHmQ4K7B8iuuTNqCj_Tdrw76djQ",
        authDomain: "scrollworld-30a25.firebaseapp.com",
        databaseURL: "https://scrollworld-30a25.firebaseio.com",
        projectId: "scrollworld-30a25",
      }
);

export default class App extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user =>
      this.setState({
        userID: user && user.uid,
        anonymous: user && user.isAnonymous,
      })
    );

    firebase
      .auth()
      .signInAnonymously()
      .catch(error => console.log(error));
  }

  render() {
    return (
      <Network
        render={({ online }) => (
          <Game {...this.state} online={online} isDevelopment={isDevelopment} />
        )}
      />
    );
  }
}
