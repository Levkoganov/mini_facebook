// Dependency
import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { Button, LinearProgress } from "@mui/material";

// Imports
import { userContext } from "../../../context/UserContext";
import { addLike } from "../../functions/addLike";

function ContentPost() {
  const { myPosts, setMyPosts, userId } = useContext(userContext);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [userId, setMyPosts, myPosts.length]);

  // Add like
  const handleAddLike = (id) => {
    return addLike(id, myPosts, setMyPosts);
  };

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
          <Button variant="outlined" onClick={() => handleAddLike(data._id)}>
            {data.likes} <AiOutlineLike />
          </Button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default ContentPost;
