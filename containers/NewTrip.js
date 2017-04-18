import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setNewTripAttr, createTrip, cancelCreatingTrip } from '../actions/trip_actions';
import TripForm from '../components/TripForm'

const mapStateToProps = (state) => {
  const {
    isSavingTrip,
    errorMessage,
    newTrip,
    isValidTrip
  } = state.trips;

  return {
    title: 'Create Trip',
    trip: newTrip,
    isSavingTrip,
    errorMessage,
    saveButtonDisabled: isSavingTrip || !isValidTrip,
    deleteButtonDisabled: isSavingTrip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripAttributeSet: (attributeName, attributeValue) => {
      dispatch(setNewTripAttr(attributeName, attributeValue));
    },
    onSave: (newTrip) => {
      dispatch(createTrip(newTrip));
    },
    onCancel: () => {
      dispatch(cancelCreatingTrip());
    }
  };
};

const NewTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);

AppRegistry.registerComponent('NewTrip', () => NewTrip);

export default NewTrip;
