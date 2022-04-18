// Dependency
import React from "react";
import { Grid } from "@mui/material";

// Imports
import { Description } from "../styles/Description.style";
import RegisterCard from "./register/RegisterCard";

function Register() {
  return (
    <Grid
      container
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      {/* Title */}
      <Grid
        item
        xs="auto"
        sm={4}
        md={4}
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Description>
          <h1>Mini Facebook</h1>
          <p>
            Connect with friends and the world around <br /> you on Mini
            Facebook.
          </p>
        </Description>
      </Grid>

      {/* Card */}
      <Grid
        item
        xs="auto"
        sm={6}
        md={6}
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <RegisterCard />
      </Grid>
    </Grid>
  );
}

export default Register;
