import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import tripSplitApp from './reducers';

authenticatedActions = store => next => action => {
  action = {
    ...action,
    session: action.session || store.getState().session.session
  };
  return next(action);
}

const store = createStore(tripSplitApp, applyMiddleware(thunk, authenticatedActions));

export default store;
