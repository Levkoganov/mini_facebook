const Post = require('../model/Post_model')

// Create new post
const createPost = async (req, res) => {
  try {
    const { header, description } = req.body

    // Declare new post
    const newPost = Post({
      header,
      description,
      author_id: req.userToken.id
    });

    //Save post and send in json
    const userPost = await newPost.save();
    res.json({message: userPost})

  } catch (err) {
    console.log(err);
  }
}

// Add like to a post
const addLike = async (req, res) => {
  try {

    // Find post by id and add new like
    const addLike = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } },
      { new: true, useFindAndModify: false }
    );

    res.json({message: addLike}) // Send updated post

  } catch (err) {
    res.json({message_error: "something went wrong"})
    console.log(err);
  }
};

// Get all post of user by user ID
const getMyPosts = async (req, res) => {
  try {

    // Find all post of the user
    const findPosts = await Post.find({author_id: req.params.id})
    .populate("author_id", [
      "header",
      "description",
      "likes",
      "username",
      "role",
    ]);
    res.json({message: findPosts})

  } catch (err) {
    console.log(err);
  }
};

// Get all post from DB (ADMIN ROUTE)
const getAllPosts = async (req, res) => {
  try {

    // Find all posts and sort by likes
    const allPosts = await Post.find().sort({likes: -1});
    res.json({message: allPosts})

  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPost,
  addLike,
  getMyPosts,
  getAllPosts
}