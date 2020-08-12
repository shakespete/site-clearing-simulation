import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MapProvider } from "./context/MapProvider";

ReactDOM.render(
  <MapProvider>
    <App />
  </MapProvider>,
  document.getElementById("root")
);
