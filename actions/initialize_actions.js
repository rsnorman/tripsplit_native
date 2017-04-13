import { dispatch } from 'react';
import { AsyncStorage } from 'react-native';

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

export const initializeHomeScreen = () => {
  return dispatch => {
    AsyncStorage.getItem('sessionData').then((sessionData) => {
      if (sessionData !== null) {
        sessionData = JSON.parse(sessionData);
        if (sessionData.user && sessionData.session) {
          dispatch(loadSavedSessionData(sessionData));
        }
      }

      dispatch(initializeAppSuccess());
    });
  }
}
