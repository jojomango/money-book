import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux'
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet
} from 'react-native';

import Input from '../components/UI/Input';
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
  } else {
    return state;
  }
};


const EditTransScreen = () => {
  const editRecord: Record = null;
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      amount: '',
      category: '',
      note: '',
      currency: ''
    },
    inputValidities: {
      amount: true,
      category: true,
      note: true,
      currency: true
    },
    formIsValid: false
  });

  const inputChangedHandler = useCallback((inputIdentifier, value, isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value,
      isValid,
      input: inputIdentifier
    })
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
      <ScrollView>
        <View style={styles.form}>
          {editRecord ? null : (
            <Input
              keyboardType='decimal-pad'
              returnKeyType='next'
              id="amount"
              label="Amount"
              errorText="Please enter a valid amount!"
              onInputChange={inputChangedHandler}
              required
              min={0}
            />
          )}
          <Input
            autoCapitalize='sentences'
            autoCorrect
            keyboardType='default'
            returnKeyType='next'
            id="category"
            label="Category"
            errorText="Please enter a valid category!"
            onInputChange={inputChangedHandler}
            initialValue={''}
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
            initialValue={''}
            initiallyValid={!!editRecord}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
})

export default EditTransScreen;
