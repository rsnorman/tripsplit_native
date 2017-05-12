import { NavigationActions } from 'react-navigation';
import NewExpenseFormStackNavigator from './../../components/NewExpenseFormStackNavigator';
import stateForRoute from './../../helpers/state-navigator';

const defaultState = {
  isViewingNewExpenseForm: false,
  isViewingPurchasers: false,
  ...NewExpenseFormStackNavigator.router.getStateForAction({})
};

const newExpenseFormNav = (state = defaultState, action) => {
  switch (action.type) {
    case 'NEW_EXPENSE':
      return {
        ...state,
        isViewingNewExpenseForm: true
      }
    case 'EXPENSE_CREATE_SUCCESS':
    case 'CANCEL_NEW_EXPENSE':
      if (state.isViewingPurchasers) {
        return {
          ...NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state),
          isViewingPurchasers: false
        };
      }

      return {
        ...state,
        isViewingNewExpenseForm: false
      };
    case 'VIEW_PURCHASERS':
      return {
        ...stateForRoute(NewExpenseFormStackNavigator.router, state, 'ExpensePurchasers'),
        isViewingPurchasers: true
      };
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return {
        ...NewExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state),
        isViewingPurchasers: false
      };
    default:
      return state;
  }
};

export default newExpenseFormNav;
