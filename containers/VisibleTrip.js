import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { updateTripImage } from '../actions/trip';
import TripView from './../components/TripView'

const mapStateToProps = (state) => {
  return {
    session: state.session.session,
    trip: state.trips.viewedTrip,
    isViewingNewExpenseForm: false,
    isViewingEditTripForm: state.trips.isViewingEditTripForm,
    isFetchingExpenses: true,
    isUploadingTripImage: state.trips.isUploadingTripImage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripImageChanged: (session, trip, image) => {
      dispatch(updateTripImage(session, trip, image))
    },
    onAddExpensePressed: () => {}
  };
};

const VisibleTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripView);

AppRegistry.registerComponent('VisibleTrip', () => VisibleTrip);

export default VisibleTrip;
