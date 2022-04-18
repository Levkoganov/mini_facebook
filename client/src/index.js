
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import App from "./App";

// Style and Css imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContext> 
      <BrowserRouter> 
        <App />
      </BrowserRouter>
    </UserContext>
  </React.StrictMode>
);
