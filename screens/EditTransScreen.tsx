import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const EditTransScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Edit Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default EditTransScreen;
