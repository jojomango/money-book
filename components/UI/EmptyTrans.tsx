import React from 'react';
import { StyleSheet, Button } from 'react-native';

import { View, Text } from '../Themed';

const EmptyTrans = props => {
  return (
    <View>
      <Text>No transactions in this book</Text>
      <Button
        title="Add a new one?"
        onPress={props.addTrans}
      />
    </View>
  );
}

export default EmptyTrans;
