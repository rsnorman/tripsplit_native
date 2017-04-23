import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import EditExpense from './../containers/EditExpense';
import ExpensePurchasers from './../containers/ExpensePurchasers';

const EditExpenseFormStackNavigator = StackNavigator({
  EditExpense: {
    screen: EditExpense,
    navigationOptions: {
      header: { visible: false }
    }
  },
  ExpensePurchasers: { screen: ExpensePurchasers }
}, {
  headerMode: 'screen'
});

AppRegistry.registerComponent('EditExpenseFormStackNavigator', () => EditExpenseFormStackNavigator);

export default EditExpenseFormStackNavigator;
