const Book = require("../models/book");
const mongoose = require("mongoose");

// GET all books
exports.book_list = async (req, res) => {
  // filter books based on logged in user_id
  const user_id = req.user_id._id;
  //   const allBooks = await Book.find({}, "title author") // with projections
  const allBooks = await Book.find({ user_id }).sort({ createdAt: 1 }).exec(); // exec() => better stack trace
  //   res.render("book_list", { title: "Book List", book_list: allBooks });
  res.status(200).json(allBooks);
};

// GET single book
exports.book_detail = async (req, res) => {
  const { id } = req.params;

  //   handle invalid id type issue
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
  }

  //   retrieve book from database
  const singleBook = await Book.findById(id).exec();

  if (!singleBook) {
    //No results
    return res.status(404).json({ error: "Book not found!" });
  }
  res.status(200).json(singleBook);
};

// Add (POST) a new book
exports.book_create = async (req, res) => {
  const { avatar, title, author, isbn, genre, publishedDate } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!isbn) {
    emptyFields.push("isbn");
  }
  if (!genre) {
    emptyFields.push("genre");
  }

  // if missing field, exit here
  if (emptyFields.length > 0) {
    return res.status(404).json({
      error: "Please fill required data for missing field(s)",
      emptyFields,
    });
  }
  // add document to db
  try {
    // grab user_id from middleware since we're logged in and have access to it
    const user_id = req.user_id._id;

    const book = await Book.create({
      user_id,
      avatar,
      title,
      author,
      isbn,
      genre,
      publishedDate,
    });
    console.log(book);
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //   res.json({ msg: "Post a new book" });
};

// UPDATE a book
exports.book_update = async (req, res) => {
  const { id } = req.params;

  //   handle invalid id type issue
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
    // return res.redirect("/books");
  }

  //   update book from database
  const updateBook = await Book.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  ).exec();

  if (!updateBook) {
    //No results
    return res.status(400).json({ error: "Book not found!" });
    // return res.redirect("/books");
  }
  res.status(200).json(updateBook);
};

// DELETE a book
exports.book_delete = async (req, res) => {
  const { id } = req.params;

  //   handle invalid id type issue
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Book not found!" });
    // return res.redirect("/books");
  }

  //   delete book from database
  const deleteBook = await Book.findOneAndDelete({ _id: id }).exec();

  if (!deleteBook) {
    //No results
    return res.status(400).json({ error: "Book not found!" });
    // return res.redirect("/books");
  }
  res.status(200).json(deleteBook);
};
