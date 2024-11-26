/**
=========================================================
* Disaster Response App
=========================================================
*/
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "mapbox-gl/dist/mapbox-gl.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
