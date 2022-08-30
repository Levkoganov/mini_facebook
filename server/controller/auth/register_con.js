// services
const { validateInputAsync } = require("../../config/joi"); // Joi input validation
const { saveNewUser } = require("../../service/create_user"); // Save user service
const { joiErrorHandler } = require("../../service/joi_error_handler"); // Handle Joi errors

const register = async (req, res) => {
  try {
    const errorHandler = []; // Error handler
    const { username, password } = req.body;

    await validateInputAsync(req.body); // validate input

    const createUser = await saveNewUser(username, password); // Create new user
    // Return error
    if (createUser.message_error) {
      errorHandler.push(createUser.message_error);
      res.json({ message_error: errorHandler });
      return;
    }
    
    res.json({ message: createUser });
  } catch (err) {
    if (err.details)
      return res.json({ message_error: joiErrorHandler(err.details) });

    // Log unexpected errors
    console.log(err);
  }
};

module.exports = {
  register,
};
