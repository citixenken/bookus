const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
UserSchema.statics.login = async () => {};

// export model
module.exports = mongoose.model("User", UserSchema);
