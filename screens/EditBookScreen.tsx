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
import { addBook, updateBook, deleteBook } from '../store/actions/books';
import { Record } from '../types';

enum inputKeys {
  amount, category, note, currency
};

type formState = {
  inputValues: {
    name: string;
    note: string;
    currency: string;
  };
  inputValidities: {
    name: boolean;
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

const initFormstate = (editBook) => {
  return {
    inputValues: {
      name: editBook ? editBook.name : '',
      note: editBook ? editBook.note : '',
      currency: editBook ? editBook.currency : 'TWD'
    },
    inputValidities: {
      name: true,
      note: true,
      currency: true
    },
    formIsValid: !!editBook
  }
}

const currencyOptions: Array<PickerItem> = CurrencyCodes.data.map(c => {
  const symbol = getSymbolFromCurrency(c.code);
  return {
  label: `${symbol? `(${symbol})` : ''} ${c.code} - ${c.currency}`,
  value: c.code,
  }})

const getCurrencyOption = (code:string) => currencyOptions.find(c => c.value === code);


const EditBookScreen = ({ navigation, route }) => {
  const bookId = (route.params || {}).bookId;
  
  let editBook:Record;
  if (bookId) {
    editBook = useSelector(state => state.books.list.find(book => book.bookId === bookId));
  }
  const bookList = useSelector(state => state.books.list);
  const dispatch = useDispatch();
  
  const [formState, dispatchFormState] = useReducer(formReducer, editBook, initFormstate);

  const submitHandler = useCallback(() => {
    if (bookId) {
      dispatch(updateBook({...editBook, ...formState.inputValues}, bookId));
    } else {
      dispatch(addBook(formState.inputValues));
    }
    navigation.navigate('Books');
  }, [formState]);
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
              initialValue={editBook ? editBook.name : ''}
              initiallyValid={!!editBook}
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
            />
            <Input
              keyboardType='default'
              returnKeyType='next'
              id="note"
              label="Note"
              errorText="Please enter a valid image note!"
              onInputChange={inputChangedHandler}
              initialValue={editBook ? editBook.note : ''}
              initiallyValid={!!editBook}
            />
            {
              editBook && (bookList.length > 1)  && (
                <Button 
                  title="Delete Book"
                  onPress={() => {
                    navigation.navigate('Books')
                    // dispatch(deleteBook(bookId))
                  }}
                />
              )
            }
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
