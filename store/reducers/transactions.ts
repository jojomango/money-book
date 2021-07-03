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
      createTimeStamp: 1625303069352,
      date: "2021-07-03",
      currency: "TWD",
      note: "Aaa",
      transId: "5b19d700-015e-4634-a1df-77da3d251651",
    },
    {
      amount: '20',
      category: "Bbb",
      createTimeStamp: 1625303083399,
      date: "2021-07-03",
      currency: "TWD",
      note: "Bbb",
      transId: "29c168f2-1285-4e39-97aa-5bac6d191206",
    },
  ],
  dateValues: {},
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      const dateValues = { ...state.dateValues };
      if (!dateValues[action.transaction.date]) {
        dateValues[action.transaction.date] = {
          records: [action.transaction],
          sum: +action.transaction.amount
        }; 
      } else {
        dateValues[action.transaction.date].records = dateValues[action.transaction.date].records.concat(action.transaction);
        dateValues[action.transaction.date].sum +=  action.transaction.amount;
      }
      return {
        ...state,
        records: state.records.concat(action.transaction),
        dateValues
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