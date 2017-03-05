import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setTripAttr, updateTrip, deleteTrip, cancelEditingTrip } from '../actions/trip';
import TripForm from '../components/TripForm'

const mapStateToProps = (state) => {
  return {
    title: 'Edit Trip',
    showDeleteButton: true,
    trip: state.trips.editingTrip,
    isSavingTrip: state.trips.isSavingTrip,
    isDeletingTrip: state.trips.isDeletingTrip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripAttributeSet: (attributeName, attributeValue) => {
      dispatch(setTripAttr(attributeName, attributeValue));
    },
    onSave: (trip) => {
      dispatch(updateTrip(trip));
    },
    onCancel: () => {
      dispatch(cancelEditingTrip());
    },
    onDelete: (trip) => {
      dispatch(deleteTrip(trip));
    }
  };
};

const EditTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripForm);

AppRegistry.registerComponent('EditTrip', () => EditTrip);

export default EditTrip;
