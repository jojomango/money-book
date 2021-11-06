import { AnyAction } from "redux";

import { Book } from "../../types";
import {
  ADD_BOOK,
  FETCH_BOOKS,
  UPDATE_BOOK,
  DELETE_BOOK,
  SET_DEFAULT_BOOK,
} from "../actions/books";

type state = {
  list: Array<Book>;
  defaultBookId: string;
};

const initState: state = {
  defaultBookId: "000",
  list: [
    {
      name: "Default accounting book",
      currency: "TWD",
      note: "record my expense",
      bookId: "000",
    },
  ],
};

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return state;
      break;
    case ADD_BOOK:
      return {
        ...state,
        list: [...state.list, action.book],
      };
    case UPDATE_BOOK: {
      const updatedList = [...state.list];
      const updatedBookIdx = updatedList.findIndex(
        (book) => book?.bookId === action.id,
      );
      updatedList[updatedBookIdx] = action.book;
      return {
        ...state,
        list: updatedList,
      };
    }
    case DELETE_BOOK: {
      const { bookId } = action;
      const newList = state.list.filter((book) => book.bookId !== bookId);
      let newDefaultId = state.defaultBookId;
      if (state.defaultBookId === bookId) {
        newDefaultId = newList[0].bookId;
      }
      return {
        defaultBookId: newDefaultId,
        list: newList,
      };
    }
    case SET_DEFAULT_BOOK:
      return {
        ...state,
        defaultBookId: action.bookId,
      };
    default:
      return state;
  }
};
