// Dependency
import React, { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Style
import { CardPostStyled } from "../styles/CardPost.style";
import { CardUsersStyled } from "../styles/CardUsers.style";

// Imports
import { userContext } from "../../context/UserContext";
import ContentForm from "./posts/ContentForm";
import ContentPost from "./posts/ContentPosts";
import ContentUsers from "./users/ContentUser";
import { setToken } from "../../config";

function MainContent() {
  const navigate = useNavigate();
  const { setIsLogged, setIsAdmin } = useContext(userContext);

  // Logout funtion
  const handleLogOut = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setToken("");
    navigate("/");
  };

  return (
    // Main Grid
    <Grid
      container
      spacing={1}
      direction="row"
      alignItems="flex-start"
      justifyContent="center"
      style={{ minHeight: "80vh" }}
    >
      {/* Card grid */}
      <Grid
        item
        xs="auto"
        sm={10}
        md={10}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {/* Main card */}
        <CardPostStyled>
          {/* Logout */}
          <Grid item xs={12} container justifyContent="flex-end">
            <Button onClick={handleLogOut}>logout</Button>
          </Grid>

          {/* Form + Post */}
          <Grid item xs={10} className="m-auto mt-5" style={{ overflowWrap: "anywhere" }}>
            <ContentForm />
            <ContentPost />
          </Grid>
        </CardPostStyled>
      </Grid>

      {/* Users */}
      <Grid
        item
        xs="auto"
        sm={1.5}
        md={1.5}
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <CardUsersStyled>
          <ContentUsers />
        </CardUsersStyled>
      </Grid>
    </Grid>
  );
}

export default MainContent;
