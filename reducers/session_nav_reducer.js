import { NavigationActions } from 'react-navigation';
import SessionStackNavigator from './../components/SessionStackNavigator';

const sessionNav = (state, action) => {
  switch (action.type) {
    case 'DESTROY_SESSION':
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'NewSession'}),
          NavigationActions.navigate({ routeName: 'NewAccount'})
        ]
      });
      return SessionStackNavigator.router.getStateForAction(resetAction, state);
    case 'VIEW_REGISTRATION':
      return SessionStackNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'NewAccount' }), state);
    case 'VIEW_LOGIN':
      return SessionStackNavigator.router.getStateForAction(NavigationActions.back(), state);
    default:
      return SessionStackNavigator.router.getStateForAction(action, state);
  }
};

export default sessionNav;
