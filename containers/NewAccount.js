import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setName, setEmail, setPassword, createAccount } from '../actions/register_actions';
import { viewLogin } from '../actions/navigation_actions';
import RegisterScreen from '../components/RegisterScreen';

const mapStateToProps = (state) => {
  const {
    name,
    email,
    password,
    isRegistering,
    errorMessage,
    validUser
  } = state.registration;

  return {
    name,
    email,
    password,
    isRegistering,
    registerButtonDisabled: !validUser || isRegistering,
    registerErrorMessage: state.registration.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNameChange: (name) => {
      dispatch(setName(name));
    },
    onEmailChange: (email) => {
      dispatch(setEmail(email));
    },
    onPasswordChange: (password) => {
      dispatch(setPassword(password))
    },
    onRegister: (name, email, password) => {
      dispatch(createAccount(name, email, password));
    },
    onLoginViewPress: () => {
      dispatch(viewLogin());
    }
  };
};

const CreateAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);

AppRegistry.registerComponent('CreateAccount', () => CreateAccount);

export default CreateAccount;
