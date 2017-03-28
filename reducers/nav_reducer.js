import { NavigationActions } from 'react-navigation';
import TripStackNavigator from './../components/TripStackNavigator';

const nav = (state, action) => {
  switch (action.type) {
    case 'SAVED_CURRENT_TRIP_LOADED':
      return TripStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleTrip', params: { trip: action.currentTrip } }), state);
    case 'TRIP_CREATE_SUCCESS':
    case 'VIEW_TRIP':
      return TripStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleTrip', params: { trip: action.trip } }), state);
    case 'TRIP_DELETE_SUCCESS':
      return TripStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_MEMBER':
      return TripStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleMember', params: { member: action.member } }), state);
    case 'VIEW_EXPENSE':
      return TripStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleExpense', params: { expense: action.expense } }), state);
    case 'EXPENSE_DELETE_SUCCESS':
      return TripStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_OBLIGATION':
      return TripStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'VisibleObligation', params: { expense: action.obligation.expense } }), state);
    default:
      return TripStackNavigator.router.getStateForAction(action, state);
  }
};

export default nav;
