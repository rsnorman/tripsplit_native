import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setEditTripAttr, updateTrip, deleteTrip, cancelEditingTrip } from '../actions/trip_actions';
import TripForm from '../components/TripForm'

const mapStateToProps = (state) => {
  const {
    isSavingTrip,
    isDeletingTrip,
    errorMessage,
    editingTrip,
    isValidTrip
  } = state.trips;

  return {
    title: 'Edit Trip',
    showDeleteButton: !!editingTrip.actions.delete,
    trip: editingTrip,
    isSavingTrip,
    isDeletingTrip,
    errorMessage,
    saveButtonDisabled: isSavingTrip || isDeletingTrip || !isValidTrip,
    deleteButtonDisabled: isSavingTrip || isDeletingTrip
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripAttributeSet: (attributeName, attributeValue) => {
      dispatch(setEditTripAttr(attributeName, attributeValue));
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
