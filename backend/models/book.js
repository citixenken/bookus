const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    user_id: { type: String, required: true }, // used to link specific book to user
    avatar: { data: Buffer, contentType: String },
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: { type: String, required: true },
    publishedDate: { type: Date },
  },
  { timestamps: true }
);

// Virtual for book's URL
BookSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/books/book/${this._id}`;
});

// export model
module.exports = mongoose.model("Book", BookSchema);
