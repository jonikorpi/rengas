import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
// import registerServiceWorker from "./registerServiceWorker";
import "jonikorpi-base-files/reset.css";
import "jonikorpi-base-files/baseline.css";
import "jonikorpi-base-files/spacing.css";
import "jonikorpi-base-files/safe-areas.css";
import "jonikorpi-base-files/flexbox.css";

import Game from "./components/Game";
import { isDevelopment } from "./utilities/helpers";
import "./css/main.css";

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

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
// registerServiceWorker();
