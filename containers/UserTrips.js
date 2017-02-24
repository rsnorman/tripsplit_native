import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addTrip, viewTrip } from '../actions/trip';
import TripsList from '../components/TripsList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
    dataSource: dataSource.cloneWithRows(state.trips.trips),
    isViewingNewTripForm: state.trips.isViewingNewTripForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
