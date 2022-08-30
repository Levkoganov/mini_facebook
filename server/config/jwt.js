const jwt = require('jsonwebtoken');

// GENERATENTOKEN
const generateToken = (data) => {
  return new Promise((success, fail) => {
    jwt.sign(data, process.env.JWT_TOKEN, { expiresIn: "10h" }, (err, token) => {
      if (err) fail(err);
      else success(token);
    });
  });
};

// VERIFYTOKEN
const verifyToken = (token) => {
  return new Promise((success, fail) => {
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) fail(err);
      else success(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verifyToken,
}