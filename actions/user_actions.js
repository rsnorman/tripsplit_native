// @flow

import { applyAuthenticationHeaders, parseResponse } from './helpers';
import { AsyncStorage } from 'react-native';
import { baseUrl } from './../constants';
import { userUpdateFailure, userPasswordChangeFailure, userDeleteFailure, userPhotoUpdateFailure } from './error_actions';

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
      .then(parseResponse(200, 'There was an error updating profile photo. Please try again.'))
      .then(json => dispatch(userImageUpdateSuccess(json)))
      .catch(error => dispatch(userPhotoUpdateFailure(error)))
  }
}

export const editUser = function(user) {
  return {
    type: 'EDIT_USER',
    user
  }
};

export const setUserAttr = (attributeName: string, attributeValue: string) => {
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

export const editUserPassword = function(user) {
  return {
    type: 'EDIT_USER_PASSWORD',
    user
  }
};

export const setUserPasswordAttr = (attributeName: string, attributeValue: string) => {
  return {
    type: 'SET_USER_PASSWORD_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

function startChangingUserPassword() {
  return {
    type: 'START_CHANGING_USER_PASSWORD'
  }
}

function userPasswordChangeSuccess(user) {
  return {
    type: 'USER_PASSWORD_CHANGE_SUCCESS',
    user: user
  }
}

export const changeUserPassword = (editingUser, changedPasswordData) => {
  let url = `${baseUrl}/auth`;
  return dispatch => {
    const { session } = dispatch(startChangingUserPassword())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: JSON.stringify({
        current_password: changedPasswordData.currentPassword,
        password: changedPasswordData.password,
        password_confirmation: changedPasswordData.passwordConfirmation
      })
    }, session))
      .then(parseResponse(200, 'There was an error changing password. Please try again.'))
      .then(json => dispatch(userPasswordChangeSuccess(json)))
      .catch(error => dispatch(userPasswordChangeFailure(error)))
  }
}

export const cancelEditingUserPassword = () => {
  return {
    type: 'CANCEL_EDITING_USER_PASSWORD'
  };
}

function startDeletingUser() {
  return {
    type: 'START_DELETING_USER'
  }
}

function userDeleteSuccess(user) {
  AsyncStorage.removeItem('sessionData');
  return {
    type: 'USER_DELETE_SUCCESS',
    user: user
  }
}


export const deleteUser = (user) => {
  let url = `${baseUrl}/auth`;

  return dispatch => {
    const { session } = dispatch(startDeletingUser());

    return fetch(url, applyAuthenticationHeaders({
      method: 'DELETE'
    }, session))
      .then(parseResponse(200, 'There was an error deleting. Please try again.'))
      .then(_json => dispatch(userDeleteSuccess(user)))
      .catch(error => dispatch(userDeleteFailure(error)))
  }
}
