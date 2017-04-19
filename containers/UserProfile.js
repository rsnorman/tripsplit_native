import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import Profile from '../components/Profile';
import { updateUserImage, editUserPassword } from '../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    isUploadingUserImage: state.user.isUploadingUserImage,
    isViewingEditUserForm: state.user.isViewingEditUserForm,
    isViewingChangeUserPasswordForm: state.user.isViewingChangeUserPasswordForm,
    uploadPhotoErrorMessage: state.user.uploadPhotoErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserImageChanged: (user, image) => {
      dispatch(updateUserImage(user, image));
    },
    onUserEditPassword: (user) => {
      dispatch(editUserPassword(user));
    }
  };
};

const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

AppRegistry.registerComponent('UserProfile', () => UserProfile);

export default UserProfile;
