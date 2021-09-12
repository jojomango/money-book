import { v4 as uuidv4 } from 'uuid';

export const FETCH_BOOKS = 'FETCH_BOOKS';
export const ADD_BOOK = 'ADD_BOOK';
export const UPDATE_BOOK = 'UPDATE_BOOK';

export const addBook = (book) => {
  return {
    type: ADD_BOOK,
    book: {
      ...book,
      bookId: uuidv4(),
    }
  }
};

export const updateBook = (book, bookId) => {
  return {
    type: UPDATE_BOOK,
    id: bookId,
    book,
  }
}

export const fetchBooks = () => {
  return {
    type: FETCH_BOOKS,
  }
};