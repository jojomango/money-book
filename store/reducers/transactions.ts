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
  [key: string]: Book;
}

type Book = {
  records: Array<Record>,
  byDate: Object,
  byMonth: Object
}

const initState: state = {
  '000': {
    records: [
      {
        amount: '15',
        category: "Aaa",
        createTimeStamp: 1626019200000,
        date: "2021-07-12",
        note: "Aaa",
        transId: "5b19d700-015e-4634-a1df-77cbnmdr123",
      },
      {
        amount: '10',
        category: "Aaa",
        createTimeStamp: 1625328000000,
        date: "2021-07-04",
        note: "Aaa",
        transId: "5b19d700-015e-4634-a1df-77da3d251651",
      },
      {
        amount: '20',
        category: "Bbb",
        createTimeStamp: 1625241600000,
        date: "2021-07-03",
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
  },
  '001': {
    records: [],
    byDate: {
      records: [],
      allDates: [],
    },
    byMonth: {
      records: [],
      allMonth: [],
    }
  },
  '002': {
    records: [],
    byDate: {
      records: [],
      allDates: [],
    },
    byMonth: {
      records: [],
      allMonth: [],
    }
  },
  '003': {
    records: [],
    byDate: {
      records: [],
      allDates: [],
    },
    byMonth: {
      records: [],
      allMonth: [],
    }
  }
}

export default (state = initState, action: AnyAction) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      const bookId = action.transaction.bookId;
      const dateString = action.transaction.date;
      const monthString = dayjs(action.transaction.createTimeStamp).format('YYYY-MM');
      const byDateState = produce(state[bookId].byDate, draftState => {
        if(draftState.records[dateString]) {
          draftState.records[dateString].unshift(action.transaction);
        } else {
          draftState.records[dateString] = [action.transaction];
          draftState.allDates.unshift(dateString);
        }
      })
      const byMonthState = produce(state[bookId].byMonth, draftState => {
        if(draftState.records[dateString]) {
          draftState.records[monthString].unshift(action.transaction);
        } else {
          draftState.records[monthString] = [action.transaction];
          draftState.allMonths.unshift(monthString);
        }
      })

      const records = produce(state[bookId].records, draft => {
        draft.unshift(action.transaction)
      });

      return {
        ...state,
        [bookId]: {
          records,
          byDate: byDateState,
          byMonth: byMonthState
        }
      }
      break;
    case UPDATE_TRANSACTION:
      const { oldBookId, newBookId } = action;
      const recordIdx = state[oldBookId].records.findIndex(record => record?.transId === action.id);
      let oldBookRecords = [...state[oldBookId].records];
      const prevRecord = oldBookRecords[recordIdx];
      const { date: prevDate } = prevRecord;
      let dateState = state[oldBookId].byDate;
      let monthState = state[oldBookId].byMonth;
      if (oldBookId === newBookId) {
        oldBookRecords[recordIdx] = action.transaction;
        if (prevDate !== action.transaction.date) {
          dateState = genByDateState(oldBookRecords);
          monthState = genByMonthState(oldBookRecords);
        }
        return {
          ...state,
          [oldBookId]: {
            records: oldBookRecords,
            byDate: dateState,
            byMonth: monthState,
          }
        }
    } else {
      delete oldBookRecords[recordIdx];
      dateState = genByDateState(oldBookRecords);
      monthState = genByMonthState(oldBookRecords);
      const newBookRecords = state[newBookId] ? [...state[newBookId].records, action.transaction] : [action.transaction];
      return {
        ...state,
        [oldBookId]: {
          records: oldBookRecords,
          byDate: dateState,
          byMonth: monthState,
        },
        [newBookId]: {
          records: newBookRecords,
          byDate: genByDateState(newBookRecords),
          byMonth: genByMonthState(newBookRecords),
        }
      }
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