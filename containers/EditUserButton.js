import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button } from 'react-native';
import { editUser } from '../actions/user_actions';

const mapStateToProps = (state) => {
  return {
    trip: state.session.user,
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
      onPress={() => onBeginEditingProfile(user)}
    />
  );
});

AppRegistry.registerComponent('EditUserButton', () => EditUserButton);

export default EditUserButton;
