import React from 'react';
import { connect } from 'react-redux';
import { fetchTrips } from '../actions';

import AccountView from '../components/AccountView'

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
    isFetchingTrips: state.trips.isFetchingTrips,
    session: state.session.session
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    onLoad: (session) => {
      dispatch(fetchTrips(session));
    }
  };
};

const ActiveAccount = connect(
  mapStateToProps,
  mapDispathToProps
)(AccountView);

export default ActiveAccount;
