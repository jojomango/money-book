import { AnyAction } from "redux";
import dayjs from "dayjs";
import produce from "immer";

import { Record } from "../../types";
import {
  ADD_TRANSACTION,
  UPDATE_TRANSACTION,
  FETCH_TRANSACTIONS,
} from "../actions/transaction";
import { ADD_BOOK } from "../actions/books";
import { genByDateState, genByMonthState } from "../../helpers/stateGenerator";

import type { TransactionActions } from "../actions/transaction";

type state = {
  [key: string]: Book;
};

type Book = {
  records: Array<Record>;
  byDate: {
    records: {
      [date: string]: Record;
    };
    allDates: Array<string>;
  };
  byMonth: {
    records: {
      [month: string]: Record;
    };
    allMonths: Array<string>;
  };
};

const generateInitState = (): Book => ({
  records: [],
  byDate: {
    records: {},
    allDates: [],
  },
  byMonth: {
    records: {},
    allMonths: [],
  },
});

const initState: state = {
  "000": generateInitState(),
};

export default (state = initState, action: TransactionActions) => {
  switch (action.type) {
    case ADD_TRANSACTION: {
      const bookId = action.transaction.bookId;
      const dateString = action.transaction.date;
      const monthString = dayjs(action.transaction.createTimeStamp).format(
        "YYYY-MM",
      );
      const byDateState = produce(state[bookId].byDate, (draftState) => {
        if (draftState.records[dateString]) {
          draftState.records[dateString].unshift(action.transaction);
        } else {
          draftState.records[dateString] = [action.transaction];
          draftState.allDates.unshift(dateString);
        }
      });
      const byMonthState = produce(state[bookId].byMonth, (draftState) => {
        if (draftState.records[dateString]) {
          draftState.records[monthString].unshift(action.transaction);
        } else {
          draftState.records[monthString] = [action.transaction];
          draftState.allMonths.unshift(monthString);
        }
      });

      const records = produce(state[bookId].records, (draft) => {
        draft.unshift(action.transaction);
      });

      return {
        ...state,
        [bookId]: {
          records,
          byDate: byDateState,
          byMonth: byMonthState,
        },
      };
      break;
    }
    case UPDATE_TRANSACTION: {
      const { oldBookId, newBookId } = action;
      const recordIdx = state[oldBookId].records.findIndex(
        (record) => record?.transId === action.id,
      );
      const oldBookRecords = [...state[oldBookId].records];
      let dateState = state[oldBookId].byDate;
      let monthState = state[oldBookId].byMonth;
      if (oldBookId === newBookId) {
        oldBookRecords[recordIdx] = action.transaction;
        dateState = genByDateState(oldBookRecords);
        monthState = genByMonthState(oldBookRecords);
        return {
          ...state,
          [oldBookId]: {
            records: oldBookRecords,
            byDate: dateState,
            byMonth: monthState,
          },
        };
      } else {
        delete oldBookRecords[recordIdx];
        dateState = genByDateState(oldBookRecords);
        monthState = genByMonthState(oldBookRecords);
        const newBookRecords = state[newBookId]
          ? [...state[newBookId].records, action.transaction]
          : [action.transaction];
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
          },
        };
      }
      break;
    }
    case FETCH_TRANSACTIONS:
      return state;
      break;
    case ADD_BOOK: {
      const bookIdNew = action.book.bookId;
      return {
        ...state,
        [bookIdNew]: generateInitState(),
      };
    }
    default:
      return state;
      break;
  }
};
