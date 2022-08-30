const User = require("../model/User_model");

// Get all users from DB
const getAllUsers = async (req, res) => {
  try {
    // Return username + role from DB
    const getUsers = await User.find({}, { username: 1, role: 1 });
    res.json({ message: getUsers });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUsers,
};
