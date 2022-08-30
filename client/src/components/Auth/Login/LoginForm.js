// Dependency
import React, { useState, useContext, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Imports
import { FormStyled } from "../../styles/Form.style";
import { setToken } from "../../../config";
import { userContext } from "../../../context/UserContext";

function LoginForm() {
  const navigate = useNavigate();
  const { setIsLogged, setUserId, setMyPosts, setUsers } = useContext(userContext);
  const [errorHandler, setErrorHandler] = useState([]);
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    setMyPosts([]);
    setUsers([]);
  }, [setMyPosts, setUsers]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const nameValues = { ...loginInfo, [name]: value };
    setLoginInfo(nameValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", loginInfo);
      const loginErrorMsg = res.data.message_error; // Get Errors from server

      // Set errors into state
      if (loginErrorMsg) return setErrorHandler(loginErrorMsg);
      if (res.data.token) {
        setIsLogged(true);
        setToken(res.data.token);
        setUserId(res.data.userId);
        navigate("/content");
      }
    } catch (error) {
      console.log("something went wrong:", error);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {/* Map Errors */}
      {errorHandler.length !== 0 &&
        errorHandler.map((result) => (
          <div key={result} className="alert alert-warning" role="alert">
            {result}.
          </div>
        ))}

      <TextField
        style={{ marginBottom: "20px" }}
        label="username"
        variant="outlined"
        name="username"
        value={loginInfo.username}
        onChange={handleChange}
      />
      <TextField
        style={{ marginBottom: "20px" }}
        label="password"
        variant="outlined"
        name="password"
        value={loginInfo.password}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginBottom: "20px", fontWeight: 600 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </FormStyled>
  );
}

export default LoginForm;
