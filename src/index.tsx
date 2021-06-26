import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import "./services/firebase";

import "./styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
