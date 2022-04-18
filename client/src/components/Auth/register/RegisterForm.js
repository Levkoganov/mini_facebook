// Dependency
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

// Imports
import { FormStyled } from "../../styles/Form.style";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const navigate = useNavigate();

  const [errorHandler, setErrorHandler] = useState([]);
  const [registerInfo, setRegisterInfo] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const nameValues = { ...registerInfo, [name]: value };
    setRegisterInfo(nameValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/register", registerInfo);
      const loginErrorMsg = res.data.message_error; // Get Errors from server

      // Set errors into state
      if (loginErrorMsg) {
        return setErrorHandler(loginErrorMsg);
      } else {
        navigate("/");
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
        value={registerInfo.username}
        onChange={handleChange}
      />
      <TextField
        style={{ marginBottom: "20px" }}
        label="password"
        variant="outlined"
        name="password"
        value={registerInfo.password}
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

export default RegisterForm;
