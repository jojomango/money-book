import React, { useCallback, useReducer, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux'
import {
  SafeAreaView,
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

import Input from '../components/UI/Input';
import { addTransaction, updateTransaction } from '../store/actions/transaction';
import { Record } from '../types';

enum inputKeys {
  amount, category, note, currency
};

type formState = {
  inputValues: {
    amount: string;
    category: string;
    note: string;
    currency: string;
  };
  inputValidities: {
    amount: boolean;
    category: boolean;
    note: boolean;
    currency: boolean;
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

const initFormstate = (editRecord) => {
  return {
    inputValues: {
      amount: editRecord ? editRecord.amount : '',
      category: editRecord ? editRecord.category : '',
      note: editRecord ? editRecord.note : '',
      currency: 'TWD'
    },
    inputValidities: {
      amount: true,
      category: true,
      note: true,
      currency: true
    },
    formIsValid: !!editRecord
  }
}

const EditTransScreen = ({ navigation, route }) => {
  const transId = (route.params || {}).transId;
  let editRecord:Record;
  if (transId) {
    editRecord = useSelector(state => state.transactions.records.find(record => record.transId === transId));
  }
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, editRecord, initFormstate);

  const submitHandler = useCallback(() => {
    if (transId) {
      dispatch(updateTransaction({...editRecord, ...formState.inputValues}, transId));
    } else {
      dispatch(addTransaction(formState.inputValues));
    }
    navigation.navigate('Transactions');
  }, [formState]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        //TODO: enable only when form is valid
        <Button disabled={!formState.formIsValid} onPress={submitHandler} title="Save" />
      ),
      headerLeft: () => (
        <Button onPress={() => {
          navigation.goBack();
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
          <Text>id: {transId}</Text>
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
})

export default EditTransScreen;
