import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button, View } from 'react-native';
import { editTrip } from '../actions/trip_actions';

const mapStateToProps = (state) => {
  return {
    trip: state.trips.viewedTrip,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBeginEditingTrip: (trip) => {
      dispatch(editTrip(trip));
    }
  };
};

const EditTripButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ trip, onBeginEditingTrip }) => {
  if (!trip.update) {
    return <View />
  }

  return (
    <Button
      title='Edit'
      onPress={() => onBeginEditingTrip(trip)}
    />
  );
});

AppRegistry.registerComponent('EditTripButton', () => EditTripButton);

export default EditTripButton;
