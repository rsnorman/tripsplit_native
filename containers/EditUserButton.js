import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import HeaderButton from './../components/HeaderButton';
import { editUser } from '../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBeginEditingProfile: (user) => {
      dispatch(editUser(user));
    }
  };
};

const EditUserButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ user, onBeginEditingProfile }) => {
  return (
    <HeaderButton
      text='Edit'
      onPress={() => onBeginEditingProfile(user)}
    />
  );
});

AppRegistry.registerComponent('EditUserButton', () => EditUserButton);

export default EditUserButton;
