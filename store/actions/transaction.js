export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const addTransaction = (trans) => {
  return {
    type: ADD_TRANSACTION,
    transaction: {
      ...trans,
      createTime: Date.now(),
    }
  }
};