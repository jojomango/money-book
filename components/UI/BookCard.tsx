import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const BookCard = props => {
  const { item } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={{...props.styles, ...styles.card}}>
        <Text style={styles.title}>{item.name}</Text> 
        <Text>{item.currency}</Text>
      </View>
    </TouchableCmp>
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
