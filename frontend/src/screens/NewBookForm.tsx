import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useBookContext } from "../../hooks/useBookContext";

const NewBookForm = () => {
  // for keeping UI in sync with DB
  const { dispatch } = useBookContext();

  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

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
      setEmptyFields(data.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      console.log("New book added successfully", data);

      //   reset form fields
      setAvatar("");
      setTitle("");
      setAuthor("");
      setIsbn("");
      setGenre("");
      setPublishedDate("");

      // for keeping UI in sync with DB /update on success
      dispatch({ type: "CREATE_BOOK", payload: data });
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
          <h2 className="text-xl text-emerald-500 font-bold mb-4">Add Book</h2>
          <div className="mb-4">
            <label htmlFor="title" className=" block font-medium mb-1">
              Book Title:
            </label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Add Book Title"
              className={
                emptyFields.includes("title")
                  ? "border-2 border-red-500 p-2 rounded-md w-full focus:border-red-500 focus:outline-none"
                  : "border border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
              }
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
              className={
                emptyFields.includes("author")
                  ? "border-2 border-red-500 p-2 rounded-md w-full focus:border-red-500 focus:outline-none"
                  : "border border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
              }
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
              className={
                emptyFields.includes("isbn")
                  ? "border-2 border-red-500 p-2 rounded-md w-full focus:border-red-500 focus:outline-none"
                  : "border border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
              }
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
              className={
                emptyFields.includes("genre")
                  ? "border-2 border-red-500 p-2 rounded-md w-full focus:border-red-500 focus:outline-none"
                  : "border border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
              }
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
              className="border border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
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
              className="border:outline-none border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:outline-none"
              onChange={(e) => setAvatar(e.target.value)}
              value={avatar}
            />
          </div>
          <button className="sm:block p-3 px-6 pt-2 text-white bg-emerald-500 rounded-full baseline hover:bg-red-500Light">
            Add Book
          </button>
          {error && (
            <div className="my-4 text-red-600 border border-red-600 bg-red-100 p-2 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default NewBookForm;
