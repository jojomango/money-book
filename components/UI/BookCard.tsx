import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookCard = props => {
  const { item } = props;
  return (
    <View style={{...props.styles, ...styles.card}}>
      <Text style={styles.title}>{item.name}</Text> 
      <Text>{item.currency}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});

export default BookCard;
