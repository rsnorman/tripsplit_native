import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import EditExpense from './../containers/EditExpense';
import ExpensePurchasers from './../containers/ExpensePurchasers';

const EditExpenseFormStackNavigator = StackNavigator({
  EditExpense: { screen: EditExpense },
  ExpensePurchasers: { screen: ExpensePurchasers }
});

AppRegistry.registerComponent('EditExpenseFormStackNavigator', () => EditExpenseFormStackNavigator);

export default EditExpenseFormStackNavigator;
