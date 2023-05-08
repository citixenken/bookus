const express = require("express");
const router = express.Router();

// require controller functions
const {
  book_list,
  book_detail,
  book_create,
  book_delete,
  book_update,
} = require("../controllers/bookController");

// GET all books
router.get("/", book_list);
// GET single book
router.get("/:id", book_detail);
// POST new book
router.post("/", book_create);
// PATCH a book
router.patch("/:id", book_update);
// DELETE book
router.delete("/:id", book_delete);

module.exports = router;
