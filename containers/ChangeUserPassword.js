import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setUserPasswordAttr, changeUserPassword, cancelEditingUserPassword } from '../actions/user_actions';
import UserPasswordForm from '../components/UserPasswordForm'

const mapStateToProps = (state) => {
  return {
    user: state.user.editingUser,
    changedPasswordData: state.user.changedPasswordData,
    isChangingUserPassword: state.user.isChangingUserPassword,
    saveButtonDisabled: state.user.isChangingUserPassword || !state.user.isValidUserPasswordChange,
    errorMessage: state.user.changePasswordErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPasswordAttributeSet: (attributeName, attributeValue) => {
      dispatch(setUserPasswordAttr(attributeName, attributeValue));
    },
    onSave: (user, changedPasswordData) => {
      dispatch(changeUserPassword(user, changedPasswordData));
    },
    onCancel: () => {
      dispatch(cancelEditingUserPassword());
    }
  };
};

const ChangeUserPassword = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPasswordForm);

AppRegistry.registerComponent('ChangeUserPassword', () => ChangeUserPassword);

export default ChangeUserPassword;
