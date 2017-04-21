import { NavigationActions } from 'react-navigation';
import EditExpenseFormStackNavigator from './../../components/EditExpenseFormStackNavigator';

const editExpenseFormNav = (state, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return EditExpenseFormStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ExpensePurchasers' }), state)
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return EditExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return EditExpenseFormStackNavigator.router.getStateForAction(action, state);
  }
};

export default editExpenseFormNav;
