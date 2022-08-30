import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Components and Imports
import MainContent from "./components/content/ContentMe";
import ConterOther from "./components/content/ContentOther";
import ContentAdmin from "./components/content/ContentAdmin";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { userContext } from "./context/UserContext";
import "./assets/App.css";
import "./config";

function App() {
  const { isLogged } = useContext(userContext);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* Current loggedin user content */}
        <Route
          path="/content"
          element={isLogged ? <MainContent /> : <Navigate to="/" />}
        ></Route>

        {/* Other users content */}
        <Route
          path="/content/:username/:id"
          element={isLogged ? <ConterOther /> : <Navigate to="/" />}
        ></Route>

        {/* Admin page content */}
        <Route
          path="/content/admin"
          element={isLogged ? <ContentAdmin /> : <Navigate to="/" />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
