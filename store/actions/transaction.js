import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const UPDATE_TRANSACTION = 'UPDATE_TRANSACTION';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

export const addTransaction = (trans) => {
  return {
    type: ADD_TRANSACTION,
    transaction: {
      ...trans,
      transId: uuidv4(),
      createTime: Date.now(),
    }
  }
};

export const updateTransaction = (trans, transId) => {
  return {
    type: UPDATE_TRANSACTION,
    id: transId,
    transaction: {
      ...trans,
      updateTime: Date.now(),
    }
  }
}

export const fetchTransactions = () => {
  return {
    type: FETCH_TRANSACTIONS,
  }
};