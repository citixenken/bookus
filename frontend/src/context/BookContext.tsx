import React, { createContext, useReducer } from "react";

export const BookContext = createContext();

export const booksReducer = (state, action) => {
  switch (action.type) {
    case "SET_BOOKS": //all books
      return {
        books: action.payload,
      };
    case "CREATE_BOOK": // add book
      return {
        books: [action.payload, ...state.books],
      };
    case "DELETE_BOOK": // delete book
      return {
        // keep those books not equal to id
        books: state.books.filter((book) => book._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const BookContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(booksReducer, { books: null });
  return (
    <BookContext.Provider value={{ ...state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
