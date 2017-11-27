import React from "react";

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
        // storageBucket: "scrollworld-dev.appspot.com",
        // messagingSenderId: "156430732048",
      }
    : {
        apiKey: "AIzaSyBROe3cnHmQ4K7B8iuuTNqCj_Tdrw76djQ",
        authDomain: "scrollworld-30a25.firebaseapp.com",
        databaseURL: "https://scrollworld-30a25.firebaseio.com",
        projectId: "scrollworld-30a25",
        // storageBucket: "",
        // messagingSenderId: "324510204761",
      }
);

export default class App extends React.Component {
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user =>
      this.setState({
        userID: user && user.uid,
        isAnonymous: user && user.isAnonymous,
      })
    );

    firebase
      .auth()
      .signInAnonymously()
      .catch(error => console.log(error));
  }

  render() {
    return <Game {...this.state} />;
  }
}
