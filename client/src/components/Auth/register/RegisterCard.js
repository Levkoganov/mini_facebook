// Dependency
import React from "react";
import { Grid, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

// Imports
import { CardStyled } from "../../styles/Card.style";
import RegisterForm from "./RegisterForm";

function RegisterCard() {
  return (
    <CardStyled>
      <Grid container>
        <Grid item xs={12} container justifyContent="flex-end">
          <Button component={NavLink} to={"/"}>
            Login
          </Button>
        </Grid>

        <Grid item xs={10} className="m-auto mt-5">
          <h3 className="text-start mb-3">Register</h3>
          <RegisterForm />
        </Grid>
      </Grid>
    </CardStyled>
  );
}

export default RegisterCard;
