import React from "react";
import ReactDOM from "react-dom/client";
import "routes/styles.css";
import App from "./components/App";
import { firebase } from "./fBase";
// import "./styles.css";
console.log(firebase);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
