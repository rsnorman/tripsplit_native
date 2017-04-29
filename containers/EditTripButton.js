import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button, View } from 'react-native';
import HeaderButton from './../components/HeaderButton';
import { editTrip } from '../actions/trip_actions';

const mapStateToProps = (state) => {
  return {
    trip: state.trips.viewedTrip,
    isVisible: !!state.trips.viewedTrip.actions.update
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
)(({ trip, isVisible, onBeginEditingTrip }) => {
  if (!isVisible) {
    return <View />;
  }

  return (
    <HeaderButton
      text='Edit'
      onPress={() => onBeginEditingTrip(trip)}
    />
  );
});

AppRegistry.registerComponent('EditTripButton', () => EditTripButton);

export default EditTripButton;
