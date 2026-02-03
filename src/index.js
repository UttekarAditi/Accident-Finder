
import React from "react";
import ReactDOM from "react-dom/client"; // React 18
import App from "./App";
import "./index.css"; // your styles
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome locally

console.log("Index.js loaded");

const rootElement = document.getElementById("root");
console.log("Root element:", rootElement);

if (!rootElement) {
  console.error("Root element not found!");
} else {
  const root = ReactDOM.createRoot(rootElement);
  console.log("React root created");
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("App rendered");
}
