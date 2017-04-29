import { combineReducers } from 'redux';

import rootNavigation from './navigation/root_navigation_reducer';
import nav from './navigation/nav_reducer';
import profileNav from './navigation/profile_nav_reducer';
import sessionNav from './navigation/session_nav_reducer';
import newExpenseFormNav from './navigation/new_expense_form_nav_reducer';
import editExpenseFormNav from './navigation/edit_expense_form_nav_reducer';

import session from './models/session_reducer';
import registration from './models/registration_reducer';
import user from './models/user_reducer';
import trips from './models/trips_reducer';
import expenses from './models/expenses_reducer';
import members from './models/members_reducer';
import obligations from './models/obligations_reducer';

import tripTabs from './components/trip_tabs_reducer';
import purchasersPicker from './components/purchasers_picker_reducer';
import confirmPopup from './components/confirm_popup_reducer';

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
  purchasersPicker,
  confirmPopup
});

export default tripSplitApp;
