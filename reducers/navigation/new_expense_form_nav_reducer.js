import { NavigationActions } from 'react-navigation';
import NewExpenseFormStackNavigator from './../../components/NewExpenseFormStackNavigator';

const newExpenseFormNav = (state, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ExpensePurchasers' }), state)
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return NewExpenseFormStackNavigator.router.getStateForAction(action, state);
  }
};

export default newExpenseFormNav;
