import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

import { Record } from "../../types";

export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const UPDATE_TRANSACTION = "UPDATE_TRANSACTION";
export const FETCH_TRANSACTIONS = "FETCH_TRANSACTIONS";

export const addTransaction = (trans: Record) => {
  const createTimeStamp = trans.createTimeStamp || dayjs().valueOf();

  return {
    type: ADD_TRANSACTION,
    transaction: {
      ...trans,
      transId: uuidv4(),
      createTimeStamp,
      date: dayjs(createTimeStamp).format("YYYY-MM-DD"),
    },
  };
};

export const updateTransaction = (
  trans: Record,
  transId: string,
  oldBookId: string,
) => {
  return {
    type: UPDATE_TRANSACTION,
    id: transId,
    oldBookId,
    newBookId: trans.bookId,
    transaction: {
      ...trans,
      date: dayjs(trans.createTimeStamp).format("YYYY-MM-DD"),
      updateTimeStamp: dayjs().valueOf(),
    },
  };
};

export const fetchTransactions = () => {
  return {
    type: FETCH_TRANSACTIONS,
  };
};
