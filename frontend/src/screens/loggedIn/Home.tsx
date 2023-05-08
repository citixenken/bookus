import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import BookDetails from "../../components/BookDetails";
// import { UserAuth } from "../../context/AuthContext";
import { useBookContext } from "../../hooks/useBookContext";

const Home = () => {
  // const { user } = UserAuth();

  // using useBookContext hook to consume books context
  // const [books, setBooks] = useState(null);
  const { books, dispatch } = useBookContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("http://localhost:4000/books");
      const data = await response.json();

      if (response.ok) {
        // setBooks(data);
        dispatch({ type: "SET_BOOKS", payload: data });
      }
    };
    fetchBooks();
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-10">
      <Navbar />
      <h4 className="text-2xl text-darkBlue font-normal">
        {/* Welcome back, {user ? user.email : null}! */}
      </h4>
      <p className="text-4xl mt-4 py-4 text-darkGrayishBlue">Book List</p>
      <div className="">
        {books
          ? books.map((book) => <BookDetails key={book._id} book={book} />)
          : null}
      </div>
    </div>
  );
};

export default Home;
