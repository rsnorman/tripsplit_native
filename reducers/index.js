import { combineReducers } from 'redux';
import nav from './nav';
import session from './session';
import trips from './trips';


const tripSplitApp = combineReducers({
  nav,
  session,
  trips
});

export default tripSplitApp;
