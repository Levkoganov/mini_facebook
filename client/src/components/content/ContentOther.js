// Dependency
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { Grid, Button, LinearProgress } from "@mui/material";

// Styles
import { CardPostStyled } from "../styles/CardPost.style";
import { CardUsersStyled } from "../styles/CardUsers.style";

// Imports
import ContentUsers from "./users/ContentUser";
import { AiOutlineLike } from "react-icons/ai";
import useAddLike from "../../hooks/useAddLike";
// import { addLike } from "../functions/addLike";

function ContentOtherUsers() {
  const params = useParams(); // Get params info
  const [otherPosts, setOtherPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorHandler, setErrorHandler] = useState("");
  const { likedPost, addLikeToPost } = useAddLike(otherPosts);

  useEffect(() => {
    (async function getUserPostInfo() {
      try {
        // Get user post by Id
        const res = await axios.get(`/posts/${params.id}`);
        setIsLoading(false);

        // If user have posts
        if (res.data.message.length !== 0) {
          setOtherPosts(res.data.message);
          setErrorHandler("");

          // If no posts
        } else {
          setErrorHandler(`${params.username} have 0 messages`);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  // Solution #1
  }, [params.id, setOtherPosts, params.username]);

  /* 
    Solution #2
    Render the component everytime there is a new like
    }, [params.id, setOtherPosts, params.username, likedPost]); 
  */

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
              { isLoading && <p className="text-center"><LinearProgress /></p> }
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
                      <Button
                        variant="outlined"
                        onClick={() => addLikeToPost(data._id)}
                      >
                        {data.likes}
                        <AiOutlineLike />
                      </Button>
                      {/* <Button variant="outlined" onClick={() => handleclick(data._id)}>
                        test
                      </Button> */}
                      <hr />
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          </CardPostStyled>
        </Grid>

        {/* all users */}
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

export default ContentOtherUsers;
