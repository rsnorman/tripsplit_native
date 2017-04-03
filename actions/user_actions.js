import { applyAuthenticationHeaders, parseResponse } from './helpers';
import { AsyncStorage } from 'react-native';
import { baseUrl } from './../constants';
import { userUpdateFailure } from './error_actions';

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
  let url = `${baseUrl}/users/${user.id}`;
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
  let url = `${baseUrl}/users/${editingUser.id}`

  return dispatch => {
    const { session } = dispatch(startUpdatingUser())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: JSON.stringify({user: editingUser})
    }, session))
      .then(parseResponse(200, 'There was an error updating profile. Please try again.'))
      .then(json => dispatch(userUpdateSuccess(json)))
      .catch(error => dispatch(userUpdateFailure(error)))
  }
}

export const cancelEditingUser = () => {
  return {
    type: 'CANCEL_EDIT_USER'
  };
}
