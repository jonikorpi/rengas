import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
// import registerServiceWorker from "./registerServiceWorker";

import Game from "./components/Game";
import { isDevelopment } from "./utilities/helpers";

import "./css/reset.css";
import "./css/globals.css";
import "./css/safeAreas.css";
import "./css/components.css";

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

ReactDOM.render(<Game />, document.getElementById("root"));
// registerServiceWorker();
