const { register } = require('../controller/auth/register_con')

const express = require('express');
const router = express.Router();

router.post('/', register);

module.exports = router;
