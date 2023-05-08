const User = require("../models/user");
const mongoose = require("mongoose");

// POST register user
exports.user_register = async (req, res) => {
  //   res.json({ msg: "Register a new user" });
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);
    // if successful, return user email and user object created in database
    res.status(200).json({ email, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST login user
exports.user_login = async (req, res) => {
  res.json({ msg: "Login registered user" });
};
