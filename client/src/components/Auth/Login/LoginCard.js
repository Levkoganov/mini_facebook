import React from "react";
import { Grid, Button } from "@mui/material";
import { CardStyled } from "../../styles/Card.style";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router-dom";


function LoginCard() {
  return (
    <CardStyled>
    <Grid container>

      <Grid item xs={12} container justifyContent="flex-end">
        <Button component={NavLink} to={"/register"}>Register</Button>
      </Grid>

      <Grid item xs={10} className="m-auto mt-5">
        <h3 className="text-start mb-3">Login</h3>
        <LoginForm />
      </Grid>
      
    </Grid>
    </CardStyled>
  );
}

export default LoginCard;
