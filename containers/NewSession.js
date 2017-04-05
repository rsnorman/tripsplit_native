import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setEmail, setPassword, createSession } from '../actions/session_actions';
import { viewRegistration } from '../actions/navigation_actions';
import LoginScreen from '../components/LoginScreen';

const mapStateToProps = (state) => {
  const {
    email,
    password,
    isLoggingIn,
    errorMessage,
    validSignIn
  } = state.session;

  return {
    email,
    password,
    isLoggingIn,
    loginButtonDisabled: !validSignIn || isLoggingIn,
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
    },
    onRegisterViewPress: () => {
      dispatch(viewRegistration());
    }
  };
};

const CreateSession = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

AppRegistry.registerComponent('CreateSession', () => CreateSession);

export default CreateSession;
