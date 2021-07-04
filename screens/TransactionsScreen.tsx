import React, { useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TransItem from '../components/UI/TransItem';
import { fetchTransactions } from '../store/actions/transaction';

export default function TransactionsScreen({navigation}) {
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
        <TransItem 
          onSelect={() => 
            navigation.navigate(
              'EditTrans', 
              { 
                screen: 'EditScreen',
                params: { transId: itemData.item.transId  }
              })
          }
          record={itemData.item}
        />
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
