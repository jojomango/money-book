import React, { useCallback, useReducer, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import type { PickerItem } from 'react-native-woodpicker'
import { Picker } from 'react-native-woodpicker'

import Input from '../components/UI/Input';
import DateInput from '../components/UI/DateInput';
import { addTransaction, updateTransaction } from '../store/actions/transaction';
import { Record } from '../types';

type formState = {
  inputValues: {
    amount: string;
    category: string;
    note: string;
    bookId: string;
  };
  inputValidities: {
    amount: boolean;
    category: boolean;
    note: boolean;
    bookId: boolean;
  };
  formIsValid: Boolean;
}

type formAction = {
  type: string;
  input: string
  value: string;
  isValid: boolean;
}

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state: formState, action: formAction) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities
    };
  }
  else {
    return state;
  }
};

const initFormstate = ({editRecord, defaultBookId, transBookId}) => {
  return {
    inputValues: {
      amount: editRecord ? editRecord.amount : '',
      category: editRecord ? editRecord.category : '',
      note: editRecord ? editRecord.note : '',
      createTimeStamp: editRecord ? editRecord.createTimeStamp : null,
      bookId: editRecord ? transBookId : defaultBookId
    },
    inputValidities: {
      amount: true,
      category: true,
      note: true,
      createTimeStamp: true,
      bookId: true
    },
    formIsValid: !!editRecord
  }
}

const EditTransScreen = ({ navigation, route }) => {
  const transId = (route.params || {}).transId;
  const transBookId = (route.params || {}).bookId;
  const booksState = useSelector(state => state.books);
  const { list: books, defaultBookId } = booksState; 

  const bookOptions: Array<PickerItem> = books.map(b => {
    return {
    label: `${b.name} -${b.currency} `,
    value: b.bookId,
    }})

  const getBookOption = (bookId:string) => bookOptions.find(b => b.value === bookId);

  let editRecord:Record;
  if (transId && transBookId) {
    editRecord = useSelector(state => state.transactions[transBookId].records.find(record => record.transId === transId));
  }
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, {editRecord, defaultBookId, transBookId}, initFormstate);

  const submitHandler = useCallback(() => {
    if (transId) {
      dispatch(updateTransaction({...editRecord, ...formState.inputValues}, transId, transBookId));
    } else {
      dispatch(addTransaction(formState.inputValues));
    }
    navigation.navigate('Transactions');
  }, [formState]);
  useEffect(()=> {
    navigation.dangerouslyGetParent().addListener('tabPress', () => {
        navigation.setParams({transId: null});
    });
  },[navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //TODO: enable only when form is valid
        <Button disabled={!formState.formIsValid} onPress={submitHandler} title="Save" />
      ),
      headerLeft: () => (
        <Button onPress={() => {
          if(navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate('Transactions')
          }
        }} title="Cancel" />
      ),
    });
  }, [navigation, submitHandler, formState.formIsValid]);

  const inputChangedHandler = useCallback((inputIdentifier, value, isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value,
      isValid,
      input: inputIdentifier
    })
  }, [dispatchFormState]);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.form}>
            <Input
              keyboardType='decimal-pad'
              returnKeyType='next'
              id="amount"
              label="Amount"
              errorText="Please enter a valid amount!"
              onInputChange={inputChangedHandler}
              initialValue={editRecord ? editRecord.amount : ''}
              initiallyValid={!!editRecord}
              required
              min={0}
            />
            <Text style={styles.label}>Book</Text>
            <Picker
                item={getBookOption(formState.inputValues.bookId)}
                items={bookOptions}
                onItemChange={option => {inputChangedHandler('bookId', option.value, true)}}
                title="Select Book"
                placeholder="Select Book"
                mode="dialog"
                style={styles.bookInput}
                containerStyle={styles.bookInputContainer}
            />
            <Input
              autoCapitalize='sentences'
              autoCorrect
              keyboardType='default'
              returnKeyType='next'
              id="category"
              label="Category"
              errorText="Please enter a valid category!"
              onInputChange={inputChangedHandler}
              initialValue={editRecord ? editRecord.category : ''}
              initiallyValid={!!editRecord}
              required
            />
            <DateInput 
              id="createTimeStamp"
              label="time"
              errorText="Please select a valid time"
              initialValue={editRecord ? editRecord.createTimeStamp: null}
              onInputChange={inputChangedHandler}
            />
            <Input
              keyboardType='default'
              returnKeyType='next'
              id="note"
              label="Note"
              errorText="Please enter a valid image note!"
              onInputChange={inputChangedHandler}
              initialValue={editRecord ? editRecord.note : ''}
              initiallyValid={!!editRecord}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  form: {
    margin: 20
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  bookInput: {
    marginHorizontal: 2,
    height: 50,
    paddingVertical: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  bookInputContainer: {
    paddingVertical: 0,
  }
})

export default EditTransScreen;
