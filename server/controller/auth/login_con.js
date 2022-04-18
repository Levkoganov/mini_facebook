// services
const { validateInputAsync } = require("../../config/joi"); // Joi input validation
const { checkPassword } = require("../../config/bcrypt"); // Decrypt password
const { generateToken } = require('../../config/jwt') // JWT Promise service
const { joiErrorHandler } = require("../../service/joi_error_handler"); // Handle Joi errors
const user = require("../../model/User_model"); // User model

const login = async (req, res) => {
  try {
    const errorHandler = []; // Error handler

    const { username, password } = req.body;
    await validateInputAsync(req.body); // Validate input
    const checkUser = await user.findOne({ username }); // Get user by username

    // User fround
    if (checkUser) {
      const validPassword = await checkPassword(password, checkUser.password);
      
      // Password found
      if(validPassword) {
        // Create payload for token
        const payload = {
         id: checkUser._id,
         username: checkUser.username,
         role: checkUser.role
        }

        const token = await generateToken(payload); // Create new token
        return res.json({loggedIn: true, token, userId: checkUser.id});
      
      // Bad password
      } else {
        errorHandler.push("incorrect password")
        res.json({ message_error: errorHandler});
      }
    // Bad username
    } else {
      errorHandler.push("user not found");
      return res.json({message_error: errorHandler});
    }

  } catch (err) {
    // Incorrect input
    if (err.details) return res.json({ message_error: joiErrorHandler(err.details)});
  }
};

module.exports = {
  login,
};
