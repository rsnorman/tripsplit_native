import { combineReducers } from 'redux';
import rootNavigation from './root_navigation_reducer';
import nav from './nav_reducer';
import session from './session_reducer';
import registration from './registration_reducer';
import user from './user_reducer';
import trips from './trips_reducer';
import expenses from './expenses_reducer';
import members from './members_reducer';
import obligations from './obligations_reducer';
import tripTabs from './trip_tabs_reducer';
import profileNav from './profile_nav_reducer';
import sessionNav from './session_nav_reducer';
import newExpenseFormNav from './new_expense_form_nav_reducer';
import editExpenseFormNav from './edit_expense_form_nav_reducer';
import purchasersPicker from './purchasers_picker_reducer';

const tripSplitApp = combineReducers({
  rootNavigation,
  nav,
  profileNav,
  sessionNav,
  newExpenseFormNav,
  editExpenseFormNav,
  session,
  registration,
  user,
  trips,
  expenses,
  members,
  obligations,
  tripTabs,
  purchasersPicker
});

export default tripSplitApp;
