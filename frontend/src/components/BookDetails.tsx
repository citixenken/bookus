import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useBookContext } from "../../hooks/useBookContext";

const BookDetails = ({ book }) => {
  const dateBookPublished = new Date(book.publishedDate).toDateString();
  // const dateBookAdded = new Date(book.createdAt).toDateString();

  // with date-fns
  const dateBookAdded = formatDistanceToNow(new Date(book.createdAt), {
    addSuffix: true,
  });

  const { dispatch } = useBookContext();

  // delete book
  const handleBookDelete = async () => {
    const response = await fetch(`http://localhost:4000/books/${book._id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: data });
    }
  };

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 my-4">
      <h1 className="text-2xl font-bold mb-2">Title: {book.title}</h1>
      <p className="text-base font-light mb-2">Author: {book.author}</p>
      <p className="text-base font-light mb-2">Genre: {book.genre}</p>
      <p className="text-base font-light mb-2">ISBN: {book.isbn}</p>
      <p className="text-base font-light mb-2">
        Date Published: {dateBookPublished}
      </p>
      <p className="text-base font-light mb-4">Book Added: {dateBookAdded}</p>
      <button>
        <RiDeleteBin5Fill
          className="text-2xl text-red-500"
          onClick={handleBookDelete}
        />
      </button>
    </div>
  );
};

export default BookDetails;
