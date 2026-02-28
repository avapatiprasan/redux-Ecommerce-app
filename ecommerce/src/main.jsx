import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import Store from "./Store";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </StrictMode>
);