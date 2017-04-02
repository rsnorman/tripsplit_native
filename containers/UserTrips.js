import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchTrips, addTrip, viewTrip } from '../actions/trip_actions';
import TripsList from '../components/TripsList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  const {
    trips,
    isViewingNewTripForm,
    isFetchingTrips,
    fetchTripsErrorMessage
  } = state.trips;

  return {
    trips,
    isViewingNewTripForm,
    isFetchingTrips,
    fetchTripsErrorMessage,
    dataSource: dataSource.cloneWithRows(state.trips.trips)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripsLoad: () => {
      dispatch(fetchTrips());
    },
    onTripAdd: () => {
      dispatch(addTrip());
    },
    onTripSelected: (trip) => {
      dispatch(viewTrip(trip));
    }
  };
};

const UserTrips = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripsList);

AppRegistry.registerComponent('UserTrips', () => UserTrips);

export default UserTrips;
