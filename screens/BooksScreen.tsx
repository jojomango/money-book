import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, FlatList, Button, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import BookCard from '../components/UI/BookCard';
import { fetchBooks } from '../store/actions/books';

export default function BooksScreen({ navigation }) {
  const dispatch = useDispatch();
  const books = useSelector(state => state.books);
  const booksList = books.list;

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('EditBook')}>
          <Ionicons.Button
            iconStyle={styles.headerIcon}
            backgroundColor="transparent"
            name="add-circle"
          />
        </TouchableWithoutFeedback>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
    <FlatList
      data={booksList}
      numColumns={2}
      keyExtractor={item => item.bookId}
      renderItem={itemData => (
        <BookCard
          isDefault={itemData.item.bookId === books.defaultBookId}
          styles={styles.card}
          item={itemData.item}
          onSelect={() => 
            navigation.navigate(
              'Transactions',
              {
                screen: 'EditBook',
                params: { bookId: itemData.item.bookId }
              })
          }
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
    paddingTop: 20
  },
  card: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10
  },
  headerIcon: {
    color: 'black',
    marginRight: 5
  }
});
