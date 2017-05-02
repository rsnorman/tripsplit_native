import { AsyncStorage } from 'react-native';
import { baseUrl } from './../constants';

export const setName = (name) => {
  return {
    type: 'SET_ACCOUNT_NAME',
    name
  };
};

export const setEmail = (email) => {
  return {
    type: 'SET_ACCOUNT_EMAIL',
    email
  };
};

export const setPassword = (password) => {
  return {
    type: 'SET_ACCOUNT_PASSWORD',
    password
  };
};

function startRegistering() {
  return {
    type: 'START_REGISTERING'
  };
}

function registerSuccess(registerData) {
  AsyncStorage.setItem('sessionData', JSON.stringify(registerData));
  return {
    type: 'CREATE_ACCOUNT',
    user: registerData.user,
    session: registerData.session
  };
}

function registerFailure(error) {
  return {
    type: 'CREATE_ACCOUNT_ERROR',
    error
  };
}

export const createAccount = (name, email, password) => {
  let url = `${baseUrl}/auth`

  return dispatch => {
    dispatch(startRegistering());
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name.trim(), email: email.trim(), password: password.trim()})}
    )
      .then(response => {
        if (response.status === 422) {
          throw(`User is already registered. Please login.`);
        }

        if (response.status !== 200) {
          throw(`There was an error registering. Please try again.`);
        }

        return new Promise((resolve, reject) => {
          let registerData = {
            client: response.headers.get('client'),
            accessToken: response.headers.get('access-token'),
            expire: response.headers.get('expiry'),
            uid: response.headers.get('uid')
          };
          response.json()
            .then(json => resolve({session: registerData, user: json['data']}))
            .catch(reject);
        })
      })
      .then(json => dispatch(registerSuccess(json)))
      .catch(error => dispatch(registerFailure(error)))
  };
};
