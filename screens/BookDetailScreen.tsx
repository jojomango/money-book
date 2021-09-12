import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, Button, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { View, Text } from '../components/Themed';
import { setDefaultBook } from '../store/actions/books';

export default function BookDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const bookId = (route.params || {}).bookId;
  const book = useSelector(state => state.books.list.find(book => book.bookId === bookId));
  const isDefault = useSelector(state => state.books.defaultBookId) === book.bookId;

  return (
      <View style={styles.container}>
        <View>
        <Text style={styles.title}>{book.name}</Text>
        {isDefault && (
          <View style={styles.defaultIcon}>
          <Ionicons
            size={30}
            name="bookmarks"
          />
          </View>
        )}
        </View>
        <Text style={styles.currency}>{book.currency}</Text>
        <Text style={styles.note}>{book.note}</Text>
        <Button
          title="Edit Book"
          onPress={() =>
            navigation.navigate(
              'Transactions',
              {
                screen: 'EditBook',
                params: { bookId: book.bookId }
              })
          }
        />
        <Button
          title="Set Default"
          onPress={() => {dispatch(setDefaultBook(book.bookId))}}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10
  },
  currency: {
    fontSize: 20,
    marginBottom: 10
  },
  note: {
    fontSize: 15,
    marginBottom: 30
  },
  defaultIcon: {
    position: 'absolute',
    right: -50,
    top: 0,
  }
});
