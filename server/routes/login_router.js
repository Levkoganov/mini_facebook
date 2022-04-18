const { login } = require("../controller/auth/login_con");

const express = require("express");
const router = express.Router();

router.post("/" ,login);

module.exports = router;
