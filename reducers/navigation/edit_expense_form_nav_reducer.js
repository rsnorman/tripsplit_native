import { NavigationActions } from 'react-navigation';
import EditExpenseFormStackNavigator from './../../components/EditExpenseFormStackNavigator';
import stateForRoute from './../../helpers/state-navigator';

const defaultState = {
  isViewingEditExpenseForm: false,
  isViewingPurchasers: false,
  ...EditExpenseFormStackNavigator.router.getStateForAction({})
};

const editExpenseFormNav = (state = defaultState, action) => {
  switch (action.type) {
    case 'EDIT_EXPENSE':
      return {
        ...state,
        isViewingEditExpenseForm: true
      }
    case 'EXPENSE_UPDATE_SUCCESS':
    case 'CANCEL_EDIT_EXPENSE':
      if (state.isViewingPurchasers) {
        return {
          ...EditExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state),
          isViewingPurchasers: false
        };
      }

      return {
        ...state,
        isViewingEditExpenseForm: false
      };
    case 'VIEW_PURCHASERS':
      return {
        ...stateForRoute(EditExpenseFormStackNavigator.router, state, 'ExpensePurchasers'),
        isViewingPurchasers: true
      };
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return {
        ...EditExpenseFormStackNavigator.router.getStateForAction(NavigationActions.back(), state),
        isViewingPurchasers: false
      };
    default:
      return state;
  }
};

export default editExpenseFormNav;
