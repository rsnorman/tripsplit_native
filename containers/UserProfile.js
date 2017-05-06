import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import Profile from '../components/Profile';
import { refreshUser, updateUserImage, editUserPassword, cancelEditingUser, cancelEditingUserPassword } from '../actions/user_actions';

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
    onUserProfileLoad: (user) => {
      dispatch(refreshUser(user));
    },
    onUserImageChanged: (user, image) => {
      dispatch(updateUserImage(user, image));
    },
    onUserEditPassword: (user) => {
      dispatch(editUserPassword(user));
    },
    onEditUserModalRequestClose: () => {
      dispatch(cancelEditingUser());
    },
    onEditUserPasswordModalRequestClose: () => {
      dispatch(cancelEditingUserPassword());
    }
  };
};

const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

AppRegistry.registerComponent('UserProfile', () => UserProfile);

export default UserProfile;
