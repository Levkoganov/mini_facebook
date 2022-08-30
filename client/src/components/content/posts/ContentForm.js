// Dependency
import React, { useState, useContext } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";

// Imports
import { FormStyled } from "../../styles/Form.style";
import { userContext } from "../../../context/UserContext";

function ContentForm() {
  const { myPosts, setMyPosts } = useContext(userContext);

  const [post, setPost] = useState({
    header: "",
    description: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    const postValues = { ...post, [name]: value };
    setPost(postValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if input is empty
      if (
        post.header === "" ||
        post.description === "" ||
        post.header.trim() === "" ||
        post.description.trim() === ""
      ) {
        alert("Please enter Header and Description is empty.");
        return;
      }

      // Create new post
      const res = await axios.post("/posts/create", post);

      // post payload
      const postInfo = res.data.message;
      const newPost = {
        _id: postInfo._id,
        header: postInfo.header,
        description: postInfo.description,
        likes: postInfo.likes,
      };

      // Append post
      setMyPosts([...myPosts, newPost]);

      // Clear input
      setPost({ header: "", description: "" });
    } catch (error) {
      console.log("something went wrong:", error);
    }
  };

  return (
    <div>
      <FormStyled onSubmit={handleSubmit}>
        <TextField
          style={{ marginBottom: "20px" }}
          id="standard-basic"
          label="header"
          variant="standard"
          placeholder="Title"
          name="header"
          value={post.header}
          onChange={handleChange}
        />

        <TextField
          style={{ marginBottom: "5px" }}
          id="outlined-multilince-static"
          label="description"
          multiline
          rows={4}
          placeholder="Enter content here"
          name="description"
          value={post.description}
          onChange={handleChange}
        />

        <Button
          style={{ marginBottom: "20px", fontWeight: 600 }}
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </FormStyled>
    </div>
  );
}

export default ContentForm;
