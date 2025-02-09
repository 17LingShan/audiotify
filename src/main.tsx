import React from "react";
import ReactDOM from "react-dom/client";
import "@/styles/main.css";
import "@/styles/wavesurfer.css";
import App from "./views/App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
