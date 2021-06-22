import { AnyAction } from 'redux'

import { Record } from '../../types';
import {
  ADD_TRANSACTION,
  FETCH_TRANSACTIONS
} from '../actions/transaction';

type state = {
  records: Array<Record>,
}

const initState: state = {
  records: []
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        records: state.records.concat(action.transaction)
      }
      break;
    case FETCH_TRANSACTIONS:
      return state;
      break;
    default:
      return state;
      break;
  }
}