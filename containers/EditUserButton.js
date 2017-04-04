import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button } from 'react-native';
import { editUser } from '../actions/user_actions';
import { primaryColor } from './../constants';

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
    <Button
      title='Edit'
      color={primaryColor}
      onPress={() => onBeginEditingProfile(user)}
    />
  );
});

AppRegistry.registerComponent('EditUserButton', () => EditUserButton);

export default EditUserButton;
