import React from "react";
import ReactDOM from "react-dom";
import "./style/main.css";
import App from "./App";
import "dotenv/config";
// import Warnings from "./Warnings";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
