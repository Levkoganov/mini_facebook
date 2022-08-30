const { getAllUsers } = require("../controller/users_con");

const express = require("express");
const router = express.Router();

// Get all users from DB
router.get("/" ,getAllUsers);

module.exports = router;
