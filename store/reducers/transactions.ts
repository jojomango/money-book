import { AnyAction } from 'redux'
import dayjs from 'dayjs';
import produce from 'immer';

import { Record } from '../../types';
import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  FETCH_TRANSACTIONS
} from '../actions/transaction';
import { genByDateState, genByMonthState } from '../../helpers/stateGenerator';

type state = {
  records: Array<Record>,
  byDate: Object,
  byMonth: Object
}

const initState: state = {
  records: [
    {
      amount: '15',
      category: "Aaa",
      createTimeStamp: 1626019200000,
      date: "2021-07-12",
      currency: "TWD",
      note: "Aaa",
      transId: "5b19d700-015e-4634-a1df-77cbnmdr123",
    },
    {
      amount: '10',
      category: "Aaa",
      createTimeStamp: 1625328000000,
      date: "2021-07-04",
      currency: "TWD",
      note: "Aaa",
      transId: "5b19d700-015e-4634-a1df-77da3d251651",
    },
    {
      amount: '20',
      category: "Bbb",
      createTimeStamp: 1625241600000,
      date: "2021-07-03",
      currency: "TWD",
      note: "Bbb",
      transId: "29c168f2-1285-4e39-97aa-5bac6d191206",
    },
  ],
  byDate: {
    records: {
      '2021-07-03': [
        {
          amount: '20',
          category: "Bbb",
          createTimeStamp: 1625241600000,
          date: "2021-07-03",
          currency: "TWD",
          note: "Bbb",
          transId: "29c168f2-1285-4e39-97aa-5bac6d191206",
        }
      ],
      '2021-07-04': [
        {
          amount: '10',
          category: "Aaa",
          createTimeStamp: 1625328000000,
          date: "2021-07-04",
          currency: "TWD",
          note: "Aaa",
          transId: "5b19d700-015e-4634-a1df-77da3d251651",
        },
      ],
      '2021-07-12': [
        {
          amount: '15',
          category: "Aaa",
          createTimeStamp: 1626019200000,
          date: "2021-07-12",
          currency: "TWD",
          note: "Aaa",
          transId: "5b19d700-015e-4634-a1df-77cbnmdr123",
        }
      ]
    },
    allDates: ['2021-07-12','2021-07-04','2021-07-03'],
  },
  byMonth: {
    records: {
      //'2021-07': [{},{}]
    },
    // []
    allMonths: ['2021-07'],
  }
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      const dateString = action.transaction.date;
      const monthString = dayjs(action.transaction.createTimeStamp).format('YYYY-MM');
      const byDateState = produce(state.byDate, draftState => {
        if(draftState.records[dateString]) {
          draftState.records[dateString].unshift(action.transaction);
        } else {
          draftState.records[dateString] = [action.transaction];
          draftState.allDates.unshift(dateString);
        }
      })
      const byMonthState = produce(state.byMonth, draftState => {
        if(draftState.records[dateString]) {
          draftState.records[monthString].unshift(action.transaction);
        } else {
          draftState.records[monthString] = [action.transaction];
          draftState.allMonths.unshift(monthString);
        }
      })

      const records = produce(state.records, draft => {
        draft.unshift(action.transaction)
      });

      return {
        ...state,
        records,
        byDate: byDateState,
        byMonth: byMonthState
      }
      break;
    case UPDATE_TRANSACTION:
      const recordIdx = state.records.findIndex(record => record?.transId === action.id);
      const updatedRecords = [...state.records];
      const prevRecord = updatedRecords[recordIdx];
      const { date: prevDate } = prevRecord;
      
      updatedRecords[recordIdx] = action.transaction;
      let dateState = state.byDate;
      let monthState = state.byMonth;
      if (prevDate !== action.transaction.date) {
        dateState = genByDateState(updatedRecords);
        monthState =  genByMonthState(updatedRecords);
      }
      return {
        ...state,
        records: updatedRecords,
        byDate: dateState,
        byMonth: monthState,
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