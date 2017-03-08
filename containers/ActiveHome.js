import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import HomeScreen from './../components/HomeScreen'
import { initializeHomeScreen } from '../actions/index';

const mapStateToProps = (state) => {
  return {
    session: state.session.session,
    isInitializing: state.session.isInitializing
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onHomeScreenLoaded: () => {
      dispatch(initializeHomeScreen());
    }
  };
};

const ActiveHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

AppRegistry.registerComponent('ActiveHome', () => ActiveHome);

export default ActiveHome;
