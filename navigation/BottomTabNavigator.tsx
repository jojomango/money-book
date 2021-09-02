/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TransactionsScreen from '../screens/TransactionsScreen';
import TransactionDetailScreen from '../screens/TransactionDetailScreen';
import BooksScreen from '../screens/BooksScreen';
import EditBookScreen from '../screens/EditBookScreen';
import EditTransScreen from '../screens/EditTransScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabEditParamList, TabTwoParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Transactions"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Transactions"
        component={TransactionsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="EditTrans"
        component={EditNavigator}
        options={({ navigation, route }) => ({
          headerTitle: 'New Transaction',
          tabBarIcon: ({ color }) => <TabBarIcon name="add-outline" color={color} />,
          tabBarLabel: "Add",
          unmountOnBlur: true,
        })}
      />
      <BottomTab.Screen
        name="Reports"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TransactionsStack = createStackNavigator<TabOneParamList>();

function TransactionsNavigator() {
  return (
    <TransactionsStack.Navigator>
      <TransactionsStack.Screen
        name="TransactionsScreen"
        component={TransactionsScreen}
        options={{ headerTitle: 'Transactions' }}
      />
      <TransactionsStack.Screen
        name="TransactionDetailScreen"
        component={TransactionDetailScreen}
        options={{ headerTitle: 'Transaction detail' }}
      />
      <TransactionsStack.Screen
        name="Books"
        component={BooksScreen}
        options={{ headerTitle: 'Money Books' }}
      />
      <TransactionsStack.Screen
        name="EditBook"
        component={EditBookScreen}
        options={{ headerTitle: 'Edit Books' }}
      />
    </TransactionsStack.Navigator>
  );
}

const EditStack = createStackNavigator<TabEditParamList>();

function EditNavigator() {
  return (
    <EditStack.Navigator>
      <EditStack.Screen
        name="EditScreen"
        component={EditTransScreen}
        options={{
            headerTitle: 'Edit Transaction',
        }}
      />
    </EditStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
