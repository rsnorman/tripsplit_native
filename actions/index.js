import { dispatch } from 'react';
import { AsyncStorage } from 'react-native';

function initializeAppSuccess(sessionData) {
  return {
    type: 'APP_INITIALIZED',
    sessionData
  };
}

export const initializeHomeScreen = () => {
  return dispatch => {
    AsyncStorage.getItem('sessionData').then((sessionData) => {
      if (sessionData !== null) {
        sessionData = JSON.parse(sessionData);
      }
      dispatch(initializeAppSuccess(sessionData))
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
