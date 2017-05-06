import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { reloadTrip, updateTripImage, cancelEditingTrip } from '../actions/trip_actions';
import { addExpense, cancelCreatingExpense } from '../actions/expense_actions';
import { addMember, cancelAddingMember } from '../actions/member_actions';
import TripView from './../components/TripView'

const EXPENSES_TAB_INDEX = 0;
const MEMBERS_TAB_INDEX = 1;

function showAddExpenseButton(state) {
  return state.tripTabs.activeTabIndex == EXPENSES_TAB_INDEX && !!state.trips.viewedTrip.actions.create_expense
}

function showAddMembersButton(state) {
  return state.tripTabs.activeTabIndex == MEMBERS_TAB_INDEX && !!state.trips.viewedTrip.actions.create_member
}

const mapStateToProps = (state) => {
  return {
    trip: state.trips.viewedTrip,
    isViewingNewExpenseForm: state.expenses.isViewingNewExpenseForm,
    isViewingNewMemberForm: state.members.isViewingNewMemberForm,
    isViewingEditTripForm: state.trips.isViewingEditTripForm,
    isFetchingExpenses: true,
    isUploadingTripImage: state.trips.isUploadingTripImage,
    needsTripReload: state.trips.isDirtyTrip,
    activeTabIndex: state.tripTabs.activeTabIndex,
    showAddExpenseButton: showAddExpenseButton(state),
    showAddMembersButton: showAddMembersButton(state),
    canEditPhoto: !!state.trips.viewedTrip.actions.update,
    uploadPhotoErrorMessage: state.trips.uploadPhotoErrorMessage
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
    },
    onAddMemberPressed: (trip) => {
      dispatch(addMember(trip));
    },
    onEditTripModalRequestClose: () => {
      dispatch(cancelEditingTrip());
    },
    onNewExpenseModalRequestClose: () => {
      dispatch(cancelCreatingExpense());
    },
    onNewMemberModalRequestClose: () => {
      dispatch(cancelAddingMember());
    }
  };
};

const VisibleTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripView);

AppRegistry.registerComponent('VisibleTrip', () => VisibleTrip);

export default VisibleTrip;
