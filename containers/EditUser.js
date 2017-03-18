import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setUserAttr, updateUser, deleteUser, cancelEditingUser } from '../actions/user_actions';
import UserForm from '../components/UserForm'

const mapStateToProps = (state) => {
  return {
    title: 'Edit User',
    user: state.user.editingUser,
    isSavingUser: state.user.isSavingUser,
    isDeletingUser: state.user.isDeletingUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserAttributeSet: (attributeName, attributeValue) => {
      dispatch(setUserAttr(attributeName, attributeValue));
    },
    onSave: (trip) => {
      dispatch(updateUser(trip));
    },
    onCancel: () => {
      dispatch(cancelEditingUser());
    }
  };
};

const EditUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

AppRegistry.registerComponent('EditUser', () => EditUser);

export default EditUser;
