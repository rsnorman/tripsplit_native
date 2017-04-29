import { NavigationActions } from 'react-navigation';
import TripStackNavigator from './../../components/TripStackNavigator';
import stateForRoute from './../../helpers/state-navigator';

const nav = (state, action) => {
  switch (action.type) {
    case 'SAVED_CURRENT_TRIP_LOADED':
      return stateForRoute(TripStackNavigator.router, state, 'VisibleTrip', { trip: action.currentTrip });
    case 'TRIP_CREATE_SUCCESS':
    case 'VIEW_TRIP':
      return stateForRoute(TripStackNavigator.router, state, 'VisibleTrip', { trip: action.trip });
    case 'TRIP_DELETE_SUCCESS':
      return TripStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_MEMBER':
      return stateForRoute(TripStackNavigator.router, state, 'VisibleMember', { member: action.member } );
    case 'VIEW_EXPENSE':
      return stateForRoute(TripStackNavigator.router, state, 'VisibleExpense', { expense: action.expense } );
    case 'EXPENSE_DELETE_SUCCESS':
    case 'MEMBER_DELETE_SUCCESS':
      return TripStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'VIEW_OBLIGATION':
      return stateForRoute(TripStackNavigator.router, state, 'VisibleObligation', { expense: action.obligation.expense } );
    default:
      return TripStackNavigator.router.getStateForAction(action, state);
  }
};

export default nav;
