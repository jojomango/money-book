import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import { fetchBooks } from '../store/actions/books';

export default function BooksScreen() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const booksList = books.list;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch])

  return (
    <View>
    <FlatList
      data={booksList}
      keyExtractor={item => item.bookId}
      renderItem={itemData => (
        <Text>{itemData.item.name} {itemData.item.currency}</Text>
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
});
