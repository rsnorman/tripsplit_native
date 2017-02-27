import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button } from 'react-native';
import { editTrip } from '../actions/trip';

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
  return (
    <Button
      title='Edit'
      onPress={() => onBeginEditingTrip(trip)}
    />
  );
});

AppRegistry.registerComponent('EditTripButton', () => EditTripButton);

export default EditTripButton;
