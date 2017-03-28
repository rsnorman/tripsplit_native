import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setEmail, setPassword, createSession } from '../actions/session_actions';
import LoginScreen from '../components/LoginScreen';

const mapStateToProps = (state) => {
  const {
    email,
    password,
    isLoggingIn,
    errorMessage,
    loginButtonDisabled
  } = state.session;

  return {
    email,
    password,
    isLoggingIn,
    loginButtonDisabled,
    loginErrorMessage: state.session.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailChange: (email) => {
      dispatch(setEmail(email));
    },
    onPasswordChange: (password) => {
      dispatch(setPassword(password))
    },
    onLogin: (email, password) => {
      dispatch(createSession(email, password));
    }
  };
};

const CreateSession = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

AppRegistry.registerComponent('CreateSession', () => CreateSession);

export default CreateSession;
