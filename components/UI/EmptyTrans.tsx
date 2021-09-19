import React from 'react';
import { StyleSheet, Button } from 'react-native';

import { View, Text } from '../Themed';

const EmptyTrans = props => {
  return (
    <View style={styles.container}>
      <Text>No transactions in this book</Text>
      <Button
        title="Add a new one?"
        onPress={props.addTrans}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default EmptyTrans;
