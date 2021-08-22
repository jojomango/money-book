import { AnyAction } from 'redux'

import { Book } from '../../types';
import {
  FETCH_BOOKS
} from '../actions/books';

type state = {
  list: Array<Book>,
  defaultBookId: string,
}

const initState: state = {
  defaultBookId: '000',
  list: [
    {
      name: 'Taiwan expense',
      currency: "TWD",
      note: "record my expense in Taiwan",
      bookId: "000"
    },
    {
      name: 'Thai travel',
      currency: "THB",
      note: "Thai travel expense",
      bookId: "001"
    }
  ],
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return state;
      break;
    default:
      return state;
      break;
  }
}