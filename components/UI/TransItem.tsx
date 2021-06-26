import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const ProductItem = props => {
  const { record } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp onPress={props.onSelect}>
      <View>
        <Text>{record.amount} - {record.createTime}</Text>
      </View>
    </TouchableCmp>
  );
}

export default ProductItem;
