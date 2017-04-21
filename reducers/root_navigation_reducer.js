import { NavigationActions } from 'react-navigation';
import RootNavigator from './../components/RootNavigator';

function onHomeScreen(state) {
  return !state.routes || !state.routes[0] || state.routes[0].index === 0;
}

/**
 * Export the reducer for the root navigator.
 */
const rootNavigation = (state, action) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
    case 'CREATE_SESSION':
    case 'DESTROY_ACCOUNT':
    case 'DESTROY_SESSION':
      if (onHomeScreen(state)) {
        return RootNavigator.router.getStateForAction(action, state);
      }
      return RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Home' }), state);
    case 'OPEN_DRAWER':
      return RootNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'DrawerOpen' }), state);
    default:
      let newState = RootNavigator.router.getStateForAction(action, state);
      if (!newState) {
        return state;
      } else {
        return newState;
      }
  }
};

export default rootNavigation;
