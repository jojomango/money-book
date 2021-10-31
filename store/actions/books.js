import { v4 as uuidv4 } from "uuid";

export const FETCH_BOOKS = "FETCH_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const SET_DEFAULT_BOOK = "SET_DEFAULT_BOOK";

export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    book: {
      ...book,
      bookId: uuidv4(),
    },
  };
};

export const updateBook = (book, bookId) => {
  return {
    type: UPDATE_BOOK,
    id: bookId,
    book,
  };
};

export const deleteBook = (bookId) => {
  return {
    type: DELETE_BOOK,
    bookId,
  };
};

export const setDefaultBook = (bookId) => {
  return {
    type: SET_DEFAULT_BOOK,
    bookId,
  };
};

export const fetchBooks = () => {
  return {
    type: FETCH_BOOKS,
  };
};
