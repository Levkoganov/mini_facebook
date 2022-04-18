const jwt = require('jsonwebtoken');
const { secret_token } = require('../config.json')

// GENERATENTOKEN
const generateToken = (data) => {
  return new Promise((success, fail) => {
    jwt.sign(data, secret_token, { expiresIn: "10h" }, (err, token) => {
      if (err) fail(err);
      else success(token);
    });
  });
};

// VERIFYTOKEN
const verifyToken = (token) => {
  return new Promise((success, fail) => {
    jwt.verify(token, secret_token, (err, decoded) => {
      if (err) fail(err);
      else success(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
}