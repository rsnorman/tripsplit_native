import { NavigationActions } from 'react-navigation';

function currentRoute(state) {
  const { index, routes } = state;
  return routes[index].routeName;
}

function isAlreadyViewingScreen(state, routeName) {
  return currentRoute(state) === routeName;
}

const stateForRoute = (router, state, routeName, params) => {
  if (isAlreadyViewingScreen(state, routeName)) {
    return state;
  }
  return router.getStateForAction(NavigationActions.navigate({ routeName, params }), state);
}

export default stateForRoute;
