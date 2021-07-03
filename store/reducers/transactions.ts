import { AnyAction } from 'redux'

import { Record } from '../../types';
import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  FETCH_TRANSACTIONS
} from '../actions/transaction';

type state = {
  records: Array<Record>,
}

const initState: state = {
  records: [
    {
      amount: '10',
      category: "Aaa",
      createTime: 1625303069352,
      currency: "TWD",
      note: "Aaa",
      transId: "5b19d700-015e-4634-a1df-77da3d251651",
    },
    {
      amount: '20',
      category: "Bbb",
      createTime: 1625303083399,
      currency: "TWD",
      note: "Bbb",
      transId: "29c168f2-1285-4e39-97aa-5bac6d191206",
    },
  ],
  monthValues: {},
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      return {
        ...state,
        records: state.records.concat(action.transaction)
      }
      break;
    case UPDATE_TRANSACTION:
      const recordIdx = state.records.findIndex(record => record?.transId === action.id);
      const updatedRecords = [...state.records];
      updatedRecords[recordIdx] = action.transaction;
      return {
        ...state,
        records: updatedRecords
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