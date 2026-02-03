
import React from "react";
import ReactDOM from "react-dom/client"; // React 18
import App from "./App";
import "./index.css"; // your styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome locally

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
