// Dependency
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button, LinearProgress } from "@mui/material";

// Imports
import { userContext } from "../../../context/UserContext";
// import { addLike } from "../../functions/addLike";
import useAddLike from "../../../hooks/useAddLike";

function ContentPost() {
  const { myPosts, setMyPosts, userId } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);
  const { likedPost, addLikeToPost } = useAddLike(myPosts);

  useEffect(() => {
    (async function getPosts() {
      try {
        if (myPosts.length !== 0) return setIsLoading(false); 

        // Get loggedin user posts
        const res = await axios.get(`/posts/${userId}`);
        setIsLoading(false);
        setMyPosts(res.data.message);
      } catch (err) {
        console.log(err);
      }
    })();
  // Solution #1
  }, [userId, setMyPosts, myPosts.length]);

  /* 
    Solution #2
    Render the component everytime there is a new like
    }, [userId, setMyPosts, myPosts.length]);
  */

  return (
    <div>
      {/* Loading */}
      {isLoading && <p className="text-center"><LinearProgress /></p>}
      <hr />
      {/* User posts */}
      {myPosts.map((data) => (
        <div key={data._id}>
          <div className="header_description_post">
            <h5>{data.header}</h5>
            <p>{data.description}</p>
          </div>
          <Button variant="outlined" onClick={() => addLikeToPost(data._id)}>
            {data.likes} <AiOutlineLike />
          </Button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ContentPost;
