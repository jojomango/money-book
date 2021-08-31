import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import BookCard from '../components/UI/BookCard';
import { fetchBooks } from '../store/actions/books';

export default function BooksScreen() {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const booksList = books.list;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch])

  return (
    <View style={styles.container}>
    <FlatList
      data={booksList}
      numColumns={2}
      keyExtractor={item => item.bookId}
      renderItem={itemData => (
        <BookCard styles={styles.card} item={itemData.item} />
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
  card: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10
  }
});
