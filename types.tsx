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
  TabTwo: undefined;
};

export type TabOneParamList = {
  TransactionsScreen: undefined;
  TransactionDetailScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Record = {
  walletId: string;
  transId: string;
  amount: number;
  currency: string;
  transTime: number;
  updateTime: number;
}
