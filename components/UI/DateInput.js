import React, { useReducer, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getDateStrMs } from "../../helpers/date";

dayjs.extend(advancedFormat);

const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
      };
      break;
    default:
      return state;
      break;
  }
};

const Input = (props) => {
  const [show, setShow] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : dayjs().valueOf(),
  });

  const handlePickerConirm = (date) => {
    const { id, onInputChange } = props;
    const dateTimeStamp = dayjs(date).valueOf();
    dispatch({ type: INPUT_CHANGE, value: dateTimeStamp });
    onInputChange(id, dateTimeStamp, true);
    setShow(false);
  };
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={getDateStrMs(inputState.value)}
        onTouchStart={() => setShow(true)}
      />
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handlePickerConirm}
        onCancel={() => setShow(false)}
        date={dayjs(inputState.value).toDate()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    marginHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});

export default Input;
