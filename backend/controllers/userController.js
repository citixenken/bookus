const User = require("../models/user");
const mongoose = require("mongoose");

// POST register user
exports.user_register = async (req, res) => {
  res.json({ msg: "Register a new user" });
};

// POST login user
exports.user_login = async (req, res) => {
  res.json({ msg: "Login registered user" });
};
