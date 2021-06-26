import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { fetchTransactions } from '../store/actions/transaction';

export default function TransactionsScreen() {
  const dispatch = useDispatch();
  const records = useSelector(state => state.transactions.records);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch])

  return (
    <FlatList
      data={records}
      keyExtractor={item => item.transId}
      renderItem={itemData => (
        <View>
          <Text>{itemData.item.amount} - {itemData.item.createTime}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
