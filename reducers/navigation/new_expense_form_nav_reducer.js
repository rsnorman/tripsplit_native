import { NavigationActions } from 'react-navigation';
import NewExpenseFormStackNavigator from './../../components/NewExpenseFormStackNavigator';
import stateForRoute from './../../helpers/state-navigator';

const newExpenseFormNav = (state, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return stateForRoute(NewExpenseFormStackNavigator.router, state, 'ExpensePurchasers');
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'POP_NEW_EXPENSE_STACK_SCREEN':
      return NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return NewExpenseFormStackNavigator.router.getStateForAction(action, state);
  }
};

export default newExpenseFormNav;
