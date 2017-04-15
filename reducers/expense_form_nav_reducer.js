import { NavigationActions } from 'react-navigation';
import ExpenseFormStackNavigator from './../components/ExpenseFormStackNavigator';

const expenseFormNav = (state, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return ExpenseFormStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ExpensePurchasers', params: { expense: action.expense } }), state);
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return ExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return ExpenseFormStackNavigator.router.getStateForAction(action, state);
  }
};

export default expenseFormNav;
