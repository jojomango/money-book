import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import TransDateItem from '../components/UI/TransDateItem';
import { fetchTransactions } from '../store/actions/transaction';

export default function BooksScreen({navigation}) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTransactions());
  // }, [dispatch])

  return (
    <View>
      <Text>Books Screen</Text>
    {/* <FlatList
      data={dateData}
      keyExtractor={item => item[0].date}
      renderItem={itemData => (
        <TransDateItem 
          navigation={navigation}
          date={itemData.item[0].date}
          records={itemData.item}
        />
      )}
    /> */}
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
});
