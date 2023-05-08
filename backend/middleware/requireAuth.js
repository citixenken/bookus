const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  // split token string and grab token
  const token = authorization.split(" ")[1];
  console.log("My token:", token);

  //   verify jwtoken has not been tampered with
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY);

    // attach _id to next subsequent methods
    // req.user = await User.findOne({ _id }, {_id: 1}); //projections
    req.user_id = await User.findOne({ _id }).select("_id");
    next(); //fires next handler fn
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
