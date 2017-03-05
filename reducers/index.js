import { combineReducers } from 'redux';
import nav from './nav';
import session from './session';
import trips from './trips';
import expenses from './expenses_reducer';
import obligations from './obligations_reducer';


const tripSplitApp = combineReducers({
  nav,
  session,
  trips,
  expenses,
  obligations
});

export default tripSplitApp;
