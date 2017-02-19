import React from 'react';
import { connect } from 'react-redux';
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

export default ActiveHome;
