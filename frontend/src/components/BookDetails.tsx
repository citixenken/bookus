import React from "react";

const BookDetails = ({ book }) => {
  const dateBookAdded = new Date(book.createdAt).toDateString();

  return (
    <div className="bg-veryLightGray rounded-lg shadow-md py-4 my-4">
      <h1 className="text-2xl font-bold mb-2">Title: {book.title}</h1>
      <p className="text-base font-light mb-2">Author: {book.author}</p>
      <p className="text-base font-light mb-2">Genre: {book.genre}</p>
      <p className="text-base font-light mb-2">ISBN: {book.isbn}</p>
      <p className="text-base font-light mb-2">
        Date Published: {book.publishedDate}
      </p>
      <p className="text-base font-light">Date Book Added: {dateBookAdded}</p>
    </div>
  );
};

export default BookDetails;
