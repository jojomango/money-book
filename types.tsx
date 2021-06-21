/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Transactions: undefined;
  EditTrans: undefined;
  Reports: undefined;
};

export type TabOneParamList = {
  TransactionsScreen: undefined;
  TransactionDetailScreen: undefined;
};

export type TabEditParamList = {
  EditScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Record = {
  walletId: string;
  transId: string;
  amount: number;
  currency: string;
  category: string;
  createTime: number;
  updateTime: number;
} | null;
