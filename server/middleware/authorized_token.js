const jwt = require("../config/jwt");

const tokenAutorization = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers["token"];
    req.userToken = await jwt.verifyToken(token); // Decoding JWT
    next();
  } catch (err) {

    return res.json({message_error: "Please provide token"});
  }
};

module.exports = {
  tokenAutorization,
};
