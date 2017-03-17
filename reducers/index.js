import { combineReducers } from 'redux';
import rootNavigation from './root_navigation_reducer';
import nav from './nav';
import session from './session';
import trips from './trips';
import expenses from './expenses_reducer';
import members from './members_reducer';
import obligations from './obligations_reducer';
import tripTabs from './trip_tabs_reducer';

const tripSplitApp = combineReducers({
  rootNavigation,
  nav,
  session,
  trips,
  expenses,
  members,
  obligations,
  tripTabs
});

export default tripSplitApp;
