import { NavigationActions } from 'react-navigation';
import SessionStackNavigator from './../../components/SessionStackNavigator';

const sessionNav = (state, action) => {
  switch (action.type) {
    case 'DESTROY_ACCOUNT':
    case 'DESTROY_SESSION':
      if (state.index === 0) {
        return SessionStackNavigator.router.getStateForAction(action, state);
      } else {
        return SessionStackNavigator.router.getStateForAction(NavigationActions.back(), state);
      }
    case 'VIEW_REGISTRATION':
      return SessionStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'NewAccount' }), state);
    case 'VIEW_LOGIN':
      return SessionStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return SessionStackNavigator.router.getStateForAction(action, state);
  }
};

export default sessionNav;
