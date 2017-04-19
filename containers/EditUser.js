import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setUserAttr, updateUser, deleteUser, cancelEditingUser } from '../actions/user_actions';
import UserForm from '../components/UserForm'

const mapStateToProps = (state) => {
  const {
    isSavingUser,
    isDeletingUser,
    errorMessage,
    editingUser,
    isValidUser
  } = state.user;

  return {
    title: 'Edit User',
    user: editingUser,
    isSavingUser,
    isDeletingUser,
    errorMessage,
    saveButtonDisabled: isSavingUser || isDeletingUser || !isValidUser,
    deleteButtonDisabled: isSavingUser || isDeletingUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserAttributeSet: (attributeName, attributeValue) => {
      dispatch(setUserAttr(attributeName, attributeValue));
    },
    onSave: (user) => {
      dispatch(updateUser(user));
    },
    onCancel: () => {
      dispatch(cancelEditingUser());
    },
    onDelete: (user) => {
      dispatch(deleteUser(user));
    }
  };
};

const EditUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);

AppRegistry.registerComponent('EditUser', () => EditUser);

export default EditUser;
