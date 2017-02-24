import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchTrips } from '../actions';
import HomeScreen from './../components/HomeScreen'

const mapStateToProps = (state) => {
  return {
    session: state.session.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const ActiveHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

AppRegistry.registerComponent('ActiveHome', () => ActiveHome);

export default ActiveHome;
