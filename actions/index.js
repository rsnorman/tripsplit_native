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

function loadSavedCurrentTrip(currentTrip) {
  return {
    type: 'SAVED_CURRENT_TRIP_LOADED',
    currentTrip
  };
}

export const initializeHomeScreen = () => {
  return dispatch => {
    AsyncStorage.getItem('sessionData').then((sessionData) => {
      if (sessionData === null) {
        dispatch(initializeAppSuccess())
      } else {
        sessionData = JSON.parse(sessionData);
        dispatch(loadSavedSessionData(sessionData))

        AsyncStorage.getItem('currentTrip').then((currentTrip) => {
          if (currentTrip !== null) {
            currentTrip = JSON.parse(currentTrip);
            dispatch(loadSavedCurrentTrip(currentTrip))
          }
          dispatch(initializeAppSuccess())
        });
      }
    });
  }
}

export const setEmail = (email) => {
  return {
    type: 'SET_EMAIL',
    email
  };
};

export const setPassword = (password) => {
  return {
    type: 'SET_PASSWORD',
    password
  };
};

function startLogin() {
  return {
    type: 'START_LOGIN'
  };
}

function loginSuccess(loginData) {
  AsyncStorage.setItem('sessionData', JSON.stringify(loginData));
  return {
    type: 'CREATE_SESSION',
    user: loginData.user,
    session: loginData.session
  };
}

export const logout = () => {
  AsyncStorage.removeItem('sessionData');
  return {
    type: 'DESTROY_SESSION'
  };
}

export const createSession = (email, password) => {
  let url = 'http://localhost:3000/auth/sign_in'

  return dispatch => {
    dispatch(startLogin())
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})}
    )
      .then(response => {
        return new Promise((resolve, reject) => {
          let sessionData = {
            client: response.headers.get('client'),
            accessToken: response.headers.get('access-token'),
            expire: response.headers.get('expiry'),
            uid: response.headers.get('uid')
          };
          response.json()
            .then(json => resolve({session: sessionData, user: json['data']}))
            .catch(reject);
        })
      })
      .then(json => dispatch(loginSuccess(json)))
      .catch(error => console.log(error))
  };
};
