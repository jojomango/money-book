import { v4 as uuidv4 } from "uuid";

export const FETCH_BOOKS = "FETCH_BOOKS";
export const ADD_BOOK = "ADD_BOOK";
export const UPDATE_BOOK = "UPDATE_BOOK";
export const DELETE_BOOK = "DELETE_BOOK";
export const SET_DEFAULT_BOOK = "SET_DEFAULT_BOOK";

import { Book } from "../../types";

export const addBook = (book: Book) => {
  return {
    type: ADD_BOOK,
    book: {
      ...book,
      bookId: uuidv4(),
    },
  };
};

export const updateBook = (book: Book, bookId: string) => {
  return {
    type: UPDATE_BOOK,
    id: bookId,
    book,
  };
};

export const deleteBook = (bookId: string) => {
  return {
    type: DELETE_BOOK,
    bookId,
  };
};

export const setDefaultBook = (bookId: string) => {
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
