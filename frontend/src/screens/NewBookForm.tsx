import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";

const NewBookForm = () => {
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [error, setError] = useState(null);

  const handleAddNewBook = async (e) => {
    e.preventDefault();

    const newBook = {
      avatar,
      title,
      author,
      isbn,
      genre,
      publishedDate,
    };

    const response = await fetch("http://localhost:4000/books", {
      method: "POST",
      body: JSON.stringify(newBook),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error); // data.error in bookController!
    }
    if (response.ok) {
      setError(null);
      console.log("New book added successfully", data);

      //   reset form fields
      setAvatar("");
      setTitle("");
      setAuthor("");
      setIsbn("");
      setGenre("");
      setPublishedDate("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <form
          className="max-w-md mx-auto p-4 rounded-md shadow-md bg-veryLightGray"
          onSubmit={handleAddNewBook}
        >
          <h2 className="text-xl font-bold mb-4">Add Book</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block font-medium mb-1">
              Book Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Add Book Title"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="author" className="block font-medium mb-1">
              Book Author:
            </label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Add Book Author"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isbn" className="block font-medium mb-1">
              Book ISBN:
            </label>
            <input
              id="isbn"
              name="isbn"
              type="text"
              placeholder="Add Book ISBN"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setIsbn(e.target.value)}
              value={isbn}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="genre" className="block font-medium mb-1">
              Book Genre:
            </label>
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder="Add Book Genre"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="publishedDate" className="block font-medium mb-1">
              Book Published Date:
            </label>
            <input
              id="publishedDate"
              name="publishedDate"
              type="date"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setPublishedDate(e.target.value)}
              value={publishedDate}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="avatar" className="block font-medium mb-1">
              Book Avatar:
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              className="w-full border-gray-300 rounded-md shadow-sm px-3 py-2 "
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </div>
          <button className="sm:block p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight">
            Add Book
          </button>
          {error && <div className="mb-4 text-brightRed">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default NewBookForm;
