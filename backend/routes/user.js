const express = require("express");
const router = express.Router();

// require controller functions
const { user_register, user_login } = require("../controllers/userController");

// POST new user
router.post("/register", user_register);
// POST registered user
router.post("/login", user_login);

module.exports = router;
