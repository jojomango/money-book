import React, { useCallback, useReducer, useLayoutEffect, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  View,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import CurrencyCodes from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map'

import Input from '../components/UI/Input';
import type { PickerItem } from 'react-native-woodpicker'
import { Picker } from 'react-native-woodpicker'
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
      name: editRecord ? editRecord.amount : '',
      note: editRecord ? editRecord.note : '',
      currency: editRecord ? editRecord.currency : 'TWD'
    },
    inputValidities: {
      name: true,
      note: true,
      currency: true
    },
    formIsValid: !!editRecord
  }
}

const currencyOptions: Array<PickerItem> = CurrencyCodes.data.map(c => ({
  label: `${c.code} (${getSymbolFromCurrency(c.code)}) - ${c.currency}`,
  value: c.code,
}))

const getCurrencyOption = (code:string) => currencyOptions.find(c => c.value === code);


const EditBookScreen = ({ navigation, route }) => {
  const bookId = (route.params || {}).bookId;
  console.log('bookId:', bookId);
  let editRecord:Record;
  if (bookId) {
    editRecord = useSelector(state => state.transactions.records.find(record => record.bookId === bookId));
  }
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, editRecord, initFormstate);

  const submitHandler = useCallback(() => {
    if (bookId) {
      dispatch(updateTransaction({...editRecord, ...formState.inputValues}, bookId));
    } else {
      dispatch(addTransaction(formState.inputValues));
    }
    navigation.navigate('Books');
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
            navigation.navigate('Books')
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

  console.log('state', formState.inputValues);

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView>
          <View style={styles.form}>
            <Input
              keyboardType='default'
              returnKeyType='next'
              id="name"
              label="Book Name"
              errorText="Please enter a valid amount!"
              onInputChange={inputChangedHandler}
              initialValue={editRecord ? editRecord.amount : ''}
              initiallyValid={!!editRecord}
              required
              min={0}
            />
           <Text style={styles.label}>Currency</Text>
            <Picker
                item={getCurrencyOption(formState.inputValues.currency)}
                items={currencyOptions}
                onItemChange={option => {inputChangedHandler('currency', option.value, true)}}
                title="Select Currency"
                placeholder="Select Currency"
                mode="dialog"
                style={styles.currencyInput}
                containerStyle={styles.currencyInputContainer}
                // textInputStyle={}
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
  currencyInput: {
    marginHorizontal: 2,
    height: 50,
    paddingVertical: 0,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  currencyInputContainer: {
    paddingVertical: 0,
  }
})

export default EditBookScreen;
