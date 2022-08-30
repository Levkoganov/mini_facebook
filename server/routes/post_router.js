const { tokenAutorization } = require('../middleware/authorized_token')
const { roleAutorization } = require('../middleware/authorized_role')
const { createPost, addLike, getMyPosts, getAllPosts } = require("../controller/post_con");

const express = require("express");
const router = express.Router();

// Create new post
router.post("/create", tokenAutorization ,createPost);

// Add like to a post
router.put("/:id", tokenAutorization ,addLike);

// Get current user post
router.get("/:id", tokenAutorization ,getMyPosts);

// Get all posts
router.get("/users/all", roleAutorization('ADMIN') ,getAllPosts);

module.exports = router;
