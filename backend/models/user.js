const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// static register method
// NOTE: arrow fns can't handle 'this' binding ... use regular fn
// UserSchema.statics.register = async (email, password) => {
UserSchema.statics.register = async function (email, password) {
  // email and password field data must be present
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  //   email and password validation => use 'validator' package
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Your password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  //check if email already registered
  const emailExists = await this.findOne({ email });
  if (emailExists) {
    throw Error(`${email} already exists. Try another email`);
  }

  //   if successful, hashing + salting password using bcrypt
  const password_salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, password_salt);

  //   create new document with email and password_hash
  const user = await this.create({ email, password: password_hash });

  return user;
};

// static login method
UserSchema.statics.login = async function (email, password) {
  // email and password field data must be present
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  //check if user is in database
  const user = await this.findOne({ email });
  if (!user) {
    throw Error(
      "Cannot find user with these credentials. Create an account to access Bookus"
    );
  }

  //   compare passwords (user supplied password vs db password)
  const password_match = await bcrypt.compare(password, user.password);

  if (!password_match) {
    throw Error("Incorrect password");
  }

  return user;
};

// export model
module.exports = mongoose.model("User", UserSchema);
