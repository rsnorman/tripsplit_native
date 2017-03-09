import { NavigationActions } from 'react-navigation';
import AppNavigator from './../components/AppNavigator';

const nav = (state, action) => {
  switch (action.type) {
    case 'SAVED_CURRENT_TRIP_LOADED':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleTrip', params: { trip: action.currentTrip } }), state);
    case 'TRIP_CREATE_SUCCESS':
    case 'VIEW_TRIP':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleTrip', params: { trip: action.trip } }), state);
    case 'TRIP_DELETE_SUCCESS':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_EXPENSE':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleExpense', params: { expense: action.expense } }), state);
    case 'EXPENSE_DELETE_SUCCESS':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_OBLIGATION':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleObligation', params: { expense: action.obligation.expense } }), state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};

export default nav;
