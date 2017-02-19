import { NavigationActions } from 'react-navigation';
import AppNavigator from './../components/AppNavigator';

const nav = (state, action) => {
  switch (action.type) {
    case 'SEARCH_SUCCESS':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'SearchResults' }), state);
    case 'VIEW_PROPERTY':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'PropertyView', params: { property: action.property } }), state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
};

export default nav;
