import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native';
import TransItem from './TransItem';

const ProductItem = props => {
  const { records, date, navigation } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
      <View>
        <Text>{date}</Text>
        {records.map(record => (
          <TransItem 
            onSelect={() => 
              navigation.navigate(
                'EditTrans', 
                { 
                  screen: 'EditScreen',
                  params: { transId: record.transId  }
                })
            }
          record={record} 
          />
        ))
        }
      </View>
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