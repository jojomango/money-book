import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

import TransItem from './TransItem';

const ProductItem = props => {
  const { records, date, navigation } = props;
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  const sum = useMemo(() =>
    records.reduce((acc, cv) => acc += +cv.amount, 0)
    , [records]);
  const [day, month, year, dayString] = useMemo(() => {
    const dayObj = dayjs(date);
    const dateArr = dayObj.format('ddd-DD-MMM-YYYY').split('-');
    let dayStr = dateArr[0];

    const todayStr = dayjs().format('yyyy-mm-dd');
    const yesterdayStr = dayjs().subtract(1, 'day').format('yyyy-mm-dd');
    if (date === todayStr) {
      dayStr = 'Today'
    } else if (date === yesterdayStr) {
      dayStr = 'Yesterday';
    }

    return [dateArr[1], dateArr[2], dateArr[3], dayStr];
  }, [date]);
  return (
    <View>
      <View style={styles.summaryRow}>
        <View style={styles.time}>
          <View>
            <Text style={styles.day}>{day}</Text>
          </View>
          <View>
            <Text>{dayString}</Text>
            <Text>{month} {year}</Text>
          </View>
        </View>
        <Text style={styles.sum}>{sum}</Text>
      </View>
      {records.map(record => (
        <TransItem
          key={record.transId}
          onSelect={() =>
            navigation.navigate(
              'EditTrans',
              {
                screen: 'EditScreen',
                params: { transId: record.transId }
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
  summaryRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  time: {
    flexDirection: 'row'
  },
  day: {
    fontSize: 32,
    marginRight: 5
  },
  sum: {
    fontSize: 32
  }
})

export default ProductItem;