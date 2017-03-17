import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setEmail, setPassword, createSession } from '../actions';
import LoginScreen from '../components/LoginScreen';

const mapStateToProps = (state) => {
  return {
    email: state.session.email,
    password: state.session.password,
    isLoggingIn: state.session.isLoggingIn
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
