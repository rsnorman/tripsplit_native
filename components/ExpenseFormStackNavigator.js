import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import NewExpense from './../containers/NewExpense';
import ExpensePurchasers from './../containers/ExpensePurchasers';

const ExpenseFormStackNavigator = StackNavigator({
  NewExpense: { screen: NewExpense },
  ExpensePurchasers: { screen: ExpensePurchasers }
});

AppRegistry.registerComponent('ExpenseFormStackNavigator', () => ExpenseFormStackNavigator);

export default ExpenseFormStackNavigator;
