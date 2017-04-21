import { dispatch } from 'react';
import { AsyncStorage } from 'react-native';
import { refreshUser } from './user_actions';

function initializeAppSuccess() {
  return {
    type: 'APP_INITIALIZED'
  };
}

function loadSavedSessionData(sessionData) {
  return {
    type: 'SAVED_SESSION_DATA_LOADED',
    sessionData
  };
}

function usersNeedsRefresh(user) {
  return Date.parse(user.refresh_at) < Date.now();
}

export const initializeHomeScreen = () => {
  return dispatch => {
    AsyncStorage.getItem('sessionData').then((sessionData) => {
      if (sessionData !== null) {
        sessionData = JSON.parse(sessionData);
        if (sessionData.user && sessionData.session) {
          dispatch(loadSavedSessionData(sessionData));

          if (usersNeedsRefresh(sessionData.user)) {
            dispatch(refreshUser(sessionData.user));
          }
        }
      }

      dispatch(initializeAppSuccess());
    });
  }
}
