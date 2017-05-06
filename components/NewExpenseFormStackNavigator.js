import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import NewExpense from './../containers/NewExpense';
import ExpensePurchasers from './../containers/ExpensePurchasers';

const NewExpenseFormStackNavigator = StackNavigator({
  NewExpense: {
    screen: NewExpense,
    navigationOptions: {
      header: null
    }
  },
  ExpensePurchasers: { screen: ExpensePurchasers }
}, {
  headerMode: 'screen'
});

AppRegistry.registerComponent('NewExpenseFormStackNavigator', () => NewExpenseFormStackNavigator);

export default NewExpenseFormStackNavigator;
