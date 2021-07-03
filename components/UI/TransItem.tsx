import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native';

const ProductItem = props => {
  const { record } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onSelect}>
      <View style={styles.recordRow}>
        <Text>{record.category}</Text>
        <Text style={styles.amount}>{record.amount}</Text>
      </View>
    </TouchableCmp>
  );
}

const styles = StyleSheet.create({
  recordRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  amount: {
    fontSize: 16
  }
})

export default ProductItem;
