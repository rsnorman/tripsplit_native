import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchTrips, addTrip } from '../actions/trip';

import AccountView from '../components/AccountView'

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
    isFetchingTrips: state.trips.isFetchingTrips,
    session: state.session.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoad: (session) => {
      dispatch(fetchTrips(session));
    },
    onAddTrip: () => {
      dispatch(addTrip());
    }
  };
};

const ActiveAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountView);

AppRegistry.registerComponent('ActiveAccount', () => ActiveAccount);

export default ActiveAccount;
