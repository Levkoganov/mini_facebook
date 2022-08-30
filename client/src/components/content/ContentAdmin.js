// Dependency
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Grid, Button, LinearProgress } from "@mui/material";

// Styles
import { CardPostStyled } from "../styles/CardPost.style";
import { CardUsersStyled } from "../styles/CardUsers.style";

// Imports
import ContentUsers from "./users/ContentUser";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";

function ContentAdmin() {
  const navigate = useNavigate();
  const [otherPosts, setOtherPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorHandler, setErrorHandler] = useState("");

  useEffect(() => {
    (async function getUserPostInfo() {
      try {
        // Admin route
        const res = await axios.get(`/posts/users/all`);
        setIsLoading(false);
        // If not autorized redirect
        if (res.data.message_error) return navigate("/")
        
        // Have Post
        if (res.data.message.length !== 0) {
          setOtherPosts(res.data.message);
          setErrorHandler("");

        // No posts
        } else {
          setErrorHandler("no messages");
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [setOtherPosts, navigate]);

  return (
    <div>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        style={{ minHeight: "80vh" }}
      >
        {/* Send post */}
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
          {/* Card */}
          <CardPostStyled>
            <Grid item xs={12} container justifyContent="flex-end">
              {/* Back to my page */}
              <Button component={NavLink} to={"/content"}>
                my page
              </Button>
            </Grid>
            <Grid
              item
              xs={10}
              className="m-auto mt-5"
              style={{ overflowWrap: "anywhere" }}
            >
              {/* Loading */}
              {isLoading && <p className="text-center"><LinearProgress /></p>}
              {/* No posts */}
              {errorHandler ? (
                <p className="text-center">{errorHandler}</p>
              ) : (
                // Have posts
                <div>
                  {otherPosts.map((data) => (
                    <div key={data._id}>
                      <div className="header_description_post">
                        <h5>{data.header}</h5>
                        <p>{data.description}</p>
                      </div>
                      <Button variant="outlined">
                        {data.likes} <AiOutlineLike />
                      </Button>
                      <hr />
                    </div>
                  ))}
                </div>
              )}
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
    </div>
  );
}

export default ContentAdmin;
