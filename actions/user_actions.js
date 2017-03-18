import { applyAuthenticationHeaders } from './helpers';
import { AsyncStorage } from 'react-native';

function updateSavedUser(user) {
  AsyncStorage.getItem('sessionData').then((sessionData) => {
    sessionData = JSON.parse(sessionData);
    sessionData = {
      ...sessionData,
      user
    };
    AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
  });
}

function startUpdatingUserImage() {
  return {
    type: 'START_UPDATING_USER_IMAGE'
  }
}

function userImageUpdateSuccess(user) {
  updateSavedUser(user);
  return {
    type: 'USER_IMAGE_UPDATE_SUCCESS',
    user
  };
}

export const updateUserImage = (user, image) => {
  let url = `http://localhost:3000/users/${user.id}`;
  const body = new FormData();

  body.append('user[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    const { session } = dispatch(startUpdatingUserImage())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: body
    }, session))
      .then(response => response.json())
      .then(json => dispatch(userImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const editUser = function(user) {
  return {
    type: 'EDIT_USER',
    user
  }
};

export const setUserAttr = (attributeName, attributeValue) => {
  return {
    type: 'SET_USER_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

function startUpdatingUser() {
  return {
    type: 'START_UPDATING_USER'
  }
}

function userUpdateSuccess(user) {
  updateSavedUser(user);
  return {
    type: 'USER_UPDATE_SUCCESS',
    user: user
  }
}

export const updateUser = (editingUser) => {
  let url = 'http://localhost:3000/users/' + editingUser.id

  return dispatch => {
    const { session } = dispatch(startUpdatingUser())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: JSON.stringify({user: editingUser})
    }, session))
      .then(response => response.json())
      .then(json => dispatch(userUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const cancelEditingUser = () => {
  return {
    type: 'CANCEL_EDIT_USER'
  };
}
