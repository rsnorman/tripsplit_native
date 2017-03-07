import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setTripAttr, createTrip, cancelCreatingTrip } from '../actions/trip';
import TripForm from '../components/TripForm'

const mapStateToProps = (state) => {
  return {
    title: 'Create Trip',
    trip: state.trips.newTrip,
    isSavingTrip: state.trips.isSavingTrip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripAttributeSet: (attributeName, attributeValue) => {
      dispatch(setTripAttr(attributeName, attributeValue));
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
