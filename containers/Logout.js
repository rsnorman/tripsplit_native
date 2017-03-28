import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, AppRegistry } from 'react-native';
import { logout } from '../actions/session_actions';

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutStart: () => {
      dispatch(logout());
    },
  };
};

class LogoutView extends Component {
  componentDidMount() {
    this.props.onLogoutStart();
  }

  render() {
    return (
      <ActivityIndicator />
    );
  }
}

const Logout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutView);

AppRegistry.registerComponent('Logout', () => Logout);

export default Logout;
