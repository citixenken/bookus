const User = require("../models/user");
const jwt = require("jsonwebtoken");

// create json web token method
// => token shape=> header.payload.signature
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "2d" });
};

// POST register user
exports.user_register = async (req, res) => {
  //   res.json({ msg: "Register a new user" });
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    // create a token
    const token = createToken(user._id);

    // if successful, return user email and token created in database
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// POST login user
exports.user_login = async (req, res) => {
  //   res.json({ msg: "Login registered user" });
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    // if successful, return user email and token created in database
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
