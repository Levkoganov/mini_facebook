const { generatePassword } = require("../config/bcrypt");
const userSchema = require("../model/User_model");

const saveNewUser = async (username, password, role) => {
  try {
    // Check if user already in DB
    const checkUser = await userSchema.findOne({ username });
    if (checkUser) return {message_error: 'User already exist'}
    
    // Encrypt password
    const hashPassword = await generatePassword(password);

    // Create new user
    const newUser = userSchema({
      username,
      password: hashPassword,// encrypted
      role
    });

    // Save user
    const saveNewUser = await newUser.save();
    return saveNewUser;

  } catch (err) {

    // Catch unexpected errors
    console.log(err);
    return err;
  }
};

module.exports = {
  saveNewUser,
};
