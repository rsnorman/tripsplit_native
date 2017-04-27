import { NavigationActions } from 'react-navigation';
import EditExpenseFormStackNavigator from './../../components/EditExpenseFormStackNavigator';
import stateForRoute from './../../helpers/state-navigator';

const editExpenseFormNav = (state, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return stateForRoute(EditExpenseFormStackNavigator.router, state, 'ExpensePurchasers');
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return EditExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return EditExpenseFormStackNavigator.router.getStateForAction(action, state);
  }
};

export default editExpenseFormNav;
