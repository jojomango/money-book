export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const FETCH_TRANSACTIONS = 'FETCH_TRANSACTIONS';

export const addTransaction = (trans) => {
  return {
    type: ADD_TRANSACTION,
    transaction: {
      ...trans,
      createTime: Date.now(),
    }
  }
};

export const fetchTransactions = () => {
  return {
    type: FETCH_TRANSACTIONS,
  }
};