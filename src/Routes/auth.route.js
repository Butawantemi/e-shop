const express = require("express");
const router = express.Router();
const User = require("../Models/user.model");
const { createUser } = require('../Controllers/auth.controller')

router.post("/", createUser);


module.exports = router;