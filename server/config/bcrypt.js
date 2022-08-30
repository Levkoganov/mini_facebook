const bcrypt = require("bcryptjs");

// ENCRYPTED PASSWORD
const generatePassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(7, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
      });
    });
  });
};

// DECRYPTING PASSWORD
const checkPassword = (password, hash) => {
  return bcrypt.compare(password, hash);
};

module.exports = {
  generatePassword,
  checkPassword
};
