import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { reloadTrip, updateTripImage } from '../actions/trip_actions';
import { addExpense } from '../actions/expense_actions';
import TripView from './../components/TripView'

const mapStateToProps = (state) => {
  return {
    trip: state.trips.viewedTrip,
    isViewingNewExpenseForm: state.expenses.isViewingNewExpenseForm,
    isViewingEditTripForm: state.trips.isViewingEditTripForm,
    isFetchingExpenses: true,
    isUploadingTripImage: state.trips.isUploadingTripImage,
    needsTripReload: state.trips.isDirtyTrip,
    activeTabIndex: state.tripTabs.activeTabIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onDirtyTripLoad: (trip) => {
      dispatch(reloadTrip(trip));
    },
    onTripImageChanged: (trip, image) => {
      dispatch(updateTripImage(trip, image))
    },
    onAddExpensePressed: (trip) => {
      dispatch(addExpense(trip));
    }
  };
};

const VisibleTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripView);

AppRegistry.registerComponent('VisibleTrip', () => VisibleTrip);

export default VisibleTrip;
