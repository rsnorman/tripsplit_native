import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import NewExpense from './../containers/NewExpense';
import ExpensePurchasers from './../containers/ExpensePurchasers';

const NewExpenseFormStackNavigator = StackNavigator({
  NewExpense: { screen: NewExpense },
  ExpensePurchasers: { screen: ExpensePurchasers }
});

AppRegistry.registerComponent('NewExpenseFormStackNavigator', () => NewExpenseFormStackNavigator);

export default NewExpenseFormStackNavigator;
