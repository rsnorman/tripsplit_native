import { applyAuthenticationHeaders } from './helpers';
import { AsyncStorage } from 'react-native';

function startUpdatingUserImage() {
  return {
    type: 'START_UPDATING_USER_IMAGE'
  }
}

function userImageUpdateSuccess(user) {
  AsyncStorage.getItem('sessionData').then((sessionData) => {
    sessionData = JSON.parse(sessionData);
    sessionData = {
      ...sessionData,
      user
    };
    AsyncStorage.setItem('sessionData', JSON.stringify(sessionData));
  });
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
