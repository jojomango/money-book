import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { View } from '../components/Themed';
import TransDateItem from '../components/UI/TransDateItem';
import { fetchTransactions } from '../store/actions/transaction';

export default function TransactionsScreen({navigation, route}) {
  const dispatch = useDispatch();
  const defaultBookId = useSelector(state => state.books.defaultBookId);
  const navBookId = (route.params || {}).bookId;
  const bookId =  navBookId || defaultBookId;
  const allTrans = useSelector(state => state.transactions);
  const bookTrans = allTrans[bookId];
  const dates = bookTrans.byDate.allDates;
  const dateRecords = bookTrans.byDate.records;
  const dateData = dates.map(date => dateRecords[date]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Books')}>
          <Ionicons.Button
            iconStyle={styles.bookIcon}
            backgroundColor="transparent"
            name="wallet-outline"
          />
        </TouchableWithoutFeedback>
      ),
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => 
            navigation.navigate(
              'Transactions',
              {
                screen: 'BookDetail',
                params: { bookId }
              })
            }>
          <Ionicons.Button
            iconStyle={styles.bookIcon}
            backgroundColor="transparent"
            name="ellipsis-vertical"
          />
        </TouchableWithoutFeedback>
      )
    });
  }, [navigation]);

  return (
    <View>
    <FlatList
      data={dateData}
      keyExtractor={item => item[0].date}
      renderItem={itemData => (
        <TransDateItem
          navigation={navigation}
          date={itemData.item[0].date}
          records={itemData.item}
          bookId={bookId}
        />
      )}
    />
    </View>
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
  bookIcon: {
    color: 'black',
    marginLeft: 5
  }
});
