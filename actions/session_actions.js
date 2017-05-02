import { AsyncStorage } from 'react-native';
import { baseUrl } from './../constants';

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

function loginFailure(error) {
  return {
    type: 'CREATE_SESSION_ERROR',
    error
  };
}

export const logout = () => {
  AsyncStorage.removeItem('sessionData');
  return {
    type: 'DESTROY_SESSION'
  };
}

export const createSession = (email, password) => {
  let url = `${baseUrl}/auth/sign_in`

  return dispatch => {
    dispatch(startLogin());
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email.trim(), password: password.trim()})}
    )
      .then(response => {
        if (response.status === 401) {
          throw(`Incorrect password for ${email}. Please try again.`);
        }

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
      .catch(error => dispatch(loginFailure(error)))
  };
};
