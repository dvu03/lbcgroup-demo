import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DemoDataProvider } from "./context/DemoDataContext";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount application");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <DemoDataProvider>
      <App />
    </DemoDataProvider>
  </React.StrictMode>
);
