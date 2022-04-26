import axios from "axios";
import { useState } from "react";

const useAddLike = (allPosts) => {
  const [likedPost, setLikedPost] = useState();

  const addLikeToPost = async (postId) => {
    try {
      const res = await axios.put(`/posts/${postId}`); // Add like
      if (res.data.message) {
        setLikedPost(res.data.message);
        /* 
          Solution 1: 
          Increment by 1 on clientside (will happen after server side is updated)
        */
        allPosts.filter((data) => data._id === postId && data.likes++);

        /*
          Solution 2:
          The Component will update everytime there's an update to the post
          (Remove "allPosts.filter()")
        */
      } else {
        console.log(res.data.message_error)
      }

    } catch (err) {
      console.log(err);
    }
  };

  return {likedPost, addLikeToPost};
};

export default useAddLike;
