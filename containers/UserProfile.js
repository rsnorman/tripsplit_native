import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import Profile from '../components/Profile';
import { updateUserImage } from '../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    user: state.session.user,
    isUploadingUserImage: state.session.isUploadingUserImage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserImageChanged: (user, image) => {
      dispatch(updateUserImage(user, image));
    }
  };
};

const UserProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

AppRegistry.registerComponent('UserProfile', () => UserProfile);

export default UserProfile;
