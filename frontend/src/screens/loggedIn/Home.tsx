import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BookDetails from "../../components/BookDetails";
import { UserAuth } from "../../../context/AuthContext";

const Home = () => {
  const { user } = UserAuth();

  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:4000/books");
      const data = await response.json();

      if (response.ok) {
        setBooks(data);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <h4 className="text-2xl text-darkBlue font-normal">
        Welcome back, {user ? user.email : null}!
      </h4>
      <p className="text-4xl mt-4 py-4 text-darkGrayishBlue">Book List</p>
      <div className="">
        {books
          ? books.map((book) => <BookDetails key={book._id} book={book} />)
          : null}
      </div>
    </>
  );
};

export default Home;
