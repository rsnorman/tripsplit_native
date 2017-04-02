// @flow

import { isInvalidForm } from './../helpers/form-validation';

let initialTripState = {
  trips: [],
  newTrip: {},
  viewedTrip: null,
  isViewingNewTripForm: false,
  isCreatingTrip: false,
  isSavingTrip: false,
  isDeletingTrip: false,
  isFetchingTrips: false,
  isFetchingTrip: false,
  isViewingEditTripForm: false,
  isUploadingTripImage: false,
  isDirtyTrip: false,
  fetchTripsErrorMessage: null,
  errorMessage: null,
  saveButtonDisabled: true
};

const trips = (state = initialTripState, action) => {
  switch (action.type) {
    case 'SAVED_CURRENT_TRIP_LOADED':
      return {
        ...state,
        isDirtyTrip: true,
        viewedTrip: action.currentTrip
      };
    case 'START_FETCHING_TRIPS':
      return {
        ...state,
        isFetchingTrips: true,
        fetchTripsErrorMessage: null
      };
    case 'TRIPS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTrips: false,
        trips: action.trips
      };
    case 'FETCH_TRIPS_ERROR':
      return {
        ...state,
        isFetchingTrips: false,
        fetchTripsErrorMessage: action.error
      };
    case 'START_FETCHING_TRIP':
      return {
        ...state,
        isFetchingTrip: true
      };
    case 'TRIP_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTrip: false,
        isDirtyTrip: false,
        viewedTrip: action.trip
      };
    case 'NEW_TRIP':
      return {
        ...state,
        newTrip: {},
        errorMessage: null,
        saveButtonDisabled: true,
        isViewingNewTripForm: true
      };
    case 'SET_NEW_TRIP_ATTRIBUTE':
      let newTrip = {...state.newTrip};
      newTrip[action.name] = action.value;

      return {
        ...state,
        newTrip,
        saveButtonDisabled: isInvalidForm(newTrip, ['name', 'location'])
      };
    case 'SET_EDIT_TRIP_ATTRIBUTE':
      let editingTrip = {...state.editingTrip};
      editingTrip[action.name] = action.value;

      return {
        ...state,
        editingTrip,
        saveButtonDisabled: isInvalidForm(editingTrip, ['name', 'location'])
      };
    case 'START_CREATING_TRIP':
      return {
        ...state,
        isSavingTrip: true,
        errorMessage: null,
        saveButtonDisabled: true
      };
    case 'TRIP_CREATE_SUCCESS':
      return {
        ...state,
        trips: [action.trip, ...state.trips],
        isSavingTrip: false,
        isViewingNewTripForm: false,
        viewedTrip: action.trip
      };
    case 'CANCEL_NEW_TRIP':
      return {
        ...state,
        isViewingNewTripForm: false
      };
    case 'VIEW_TRIP':
      return {
        ...state,
        viewedTrip: action.trip
      };
    case 'EDIT_TRIP':
      return {
        ...state,
        editingTrip: action.trip,
        errorMessage: null,
        saveButtonDisabled: true,
        isViewingEditTripForm: true
      };
    case 'START_UPDATING_TRIP':
      return {
        ...state,
        isSavingTrip: true,
        errorMessage: null,
        saveButtonDisabled: true
      };
    case 'TRIP_UPDATE_SUCCESS':
      let updatedTripIndex = state.trips.findIndex((trip) => trip.id === action.trip.id);
      let tripsWithUpdated = JSON.parse(JSON.stringify(state.trips));
      tripsWithUpdated[updatedTripIndex] = action.trip;

      return {
        ...state,
        trips: tripsWithUpdated,
        viewedTrip: action.trip,
        isSavingTrip: false,
        isViewingEditTripForm: false
      };
    case 'START_UPDATING_TRIP_IMAGE':
      return {
        ...state,
        isUploadingTripImage: true
      };
    case 'TRIP_IMAGE_UPDATE_SUCCESS':
      let updatedTripImageIndex = state.trips.findIndex((trip) => trip.id === action.trip.id);
      let tripsWithUpdatedImage = JSON.parse(JSON.stringify(state.trips));
      tripsWithUpdatedImage[updatedTripImageIndex] = action.trip;

      return {
        ...state,
        trips: tripsWithUpdatedImage,
        viewedTrip: action.trip,
        isUploadingTripImage: false
      };
    case 'CANCEL_EDIT_TRIP':
      return {
        ...state,
        isViewingEditTripForm: false
      };
    case 'START_DELETING_TRIP':
      return {
        ...state,
        errorMessage: null,
        isDeletingTrip: true
      };
    case 'TRIP_DELETE_SUCCESS':
      let deletedTripIndex = state.trips.findIndex((trip) => trip.id === action.trip.id);
      let tripsWithoutDeleted = JSON.parse(JSON.stringify(state.trips));
      tripsWithoutDeleted.splice(deletedTripIndex, 1)

      return {
        ...state,
        trips: tripsWithoutDeleted,
        isDeletingTrip: false,
        isViewingEditTripForm: false
      };
    case 'SAVE_TRIP_ERROR':
      return {
        ...state,
        isSavingTrip: false,
        saveButtonDisabled: false,
        errorMessage: action.error
      };
    case 'EXPENSE_CREATE_SUCCESS':
    case 'EXPENSE_UPDATE_SUCCESS':
    case 'EXPENSE_DELETE_SUCCESS':
      let updatedTripExpenseIndex = state.trips.findIndex((trip) => trip.id === action.expense.trip.id);
      let tripsWithUpdatedExpenses = JSON.parse(JSON.stringify(state.trips));
      tripsWithUpdatedExpenses[updatedTripExpenseIndex] = action.expense.trip;
      return {
        ...state,
        trips: tripsWithUpdatedExpenses,
        viewedTrip: action.expense.trip
      };
    default:
      return state;
  }
};

export default trips;
