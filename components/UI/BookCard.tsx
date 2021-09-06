import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        {props.isDefault && (
          <View style={styles.defaultIcon}>
          <Ionicons
            size={30}
            name="bookmarks"
          />
          </View>
        )}
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
  },
  defaultIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 20
  }
});

export default BookCard;
