const Joi = require('joi');

// Validate user info
const authSchema = Joi.object({
  // Check password
  password: Joi.string().max(10).required().messages({
    'string.max': 'Password must be under 10 Charactars',
    'string.empty': 'Password is empty',
  }),

  // Check username
  username: Joi.string().max(10).required(10).messages({
    'string.max': 'Username must be under 10 Charactars',
    'string.empty': 'Username is empty',
  }),
});

// Validate data
const validateInputAsync = (data) => {
  return authSchema.validateAsync(data, { abortEarly: false });
};

module.exports = {
  validateInputAsync,
};
