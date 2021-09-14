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
  Books: undefined;
  BookDetail: undefined;
  EditBook: undefined;
};

export type TabEditParamList = {
  EditScreen: undefined;
  AddScreen: undefined;
};

export type TabTwoParamList = {
  ReportScreen: undefined;
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

export type Book = {
  name: string;
  currency: string;
  note: string;
  bookId: string;
} | null;
