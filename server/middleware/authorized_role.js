const jwt = require("../config/jwt");

const roleAutorization = (authorizedRole) => {
  return async (req, res, next) => {
    try {
      // Get token from headers
      const token = req.headers["token"];
      const { role } = await jwt.verifyToken(token); // Decoding JWT

      let isAllowed = false;
      if (authorizedRole === role) isAllowed = true;
      if (!isAllowed)
        return res.json({ message_error: "User is not autorized" });

      next();
    } catch (err) {
      return res.json({ message_error: "Please provide token" });
    }
  };
};

module.exports = {
  roleAutorization,
};
