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
      name: 'SG 日常',
      currency: "SGD",
      note: "record my expense in Singapore",
      bookId: "003"
    },
    {
      name: 'Thai travel',
      currency: "THB",
      note: "Thai travel expense",
      bookId: "001"
    },
    {
      name: 'Viet travel',
      currency: "VNB",
      note: "Vietnam travel expense",
      bookId: "002"
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