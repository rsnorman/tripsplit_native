// @flow

import { isInvalidForm } from './../../helpers/form-validation';

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
  isValidTrip: false,
  uploadPhotoErrorMessage: null,
  refreshTripErrorMessage: null
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
        trips: [],
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
        isFetchingTrip: true,
        refreshTripErrorMessage: null
      };
    case 'TRIP_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTrip: false,
        isDirtyTrip: false,
        viewedTrip: action.trip
      };
    case 'REFRESH_TRIP_ERROR':
      return {
        ...state,
        isFetchingTrip: false,
        tripRefreshErrorMessage: action.error
      };
    case 'NEW_TRIP':
      return {
        ...state,
        newTrip: {},
        errorMessage: null,
        isValidTrip: false,
        isViewingNewTripForm: true
      };
    case 'SET_NEW_TRIP_ATTRIBUTE':
      let newTrip = {...state.newTrip};
      newTrip[action.name] = action.value;

      return {
        ...state,
        newTrip,
        isValidTrip: !isInvalidForm(newTrip, ['name', 'location'])
      };
    case 'SET_EDIT_TRIP_ATTRIBUTE':
      let editingTrip = {...state.editingTrip};
      editingTrip[action.name] = action.value;

      return {
        ...state,
        editingTrip,
        isValidTrip: !isInvalidForm(editingTrip, ['name', 'location'])
      };
    case 'START_CREATING_TRIP':
      return {
        ...state,
        isSavingTrip: true,
        errorMessage: null
      };
    case 'TRIP_CREATE_SUCCESS':
      return {
        ...state,
        trips: [action.trip, ...state.trips],
        isSavingTrip: false,
        isViewingNewTripForm: false,
        viewedTrip: action.trip
      };
    case 'SAVE_TRIP_ERROR':
      return {
        ...state,
        isSavingTrip: false,
        errorMessage: action.error
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
        isValidTrip: false,
        isViewingEditTripForm: true
      };
    case 'START_UPDATING_TRIP':
      return {
        ...state,
        isSavingTrip: true,
        errorMessage: null,
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
        isUploadingTripImage: true,
        uploadPhotoErrorMessage: null
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
    case 'UPDATE_TRIP_PHOTO_ERROR':
      return {
        ...state,
        isUploadingTripImage: false,
        uploadPhotoErrorMessage: action.error
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
    case 'DELETE_TRIP_ERROR':
      return {
        ...state,
        isDeletingTrip: false,
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
    case 'MEMBER_CREATE_SUCCESS':
    case 'MEMBER_DELETE_SUCCESS':
      let updatedTripMemberIndex = state.trips.findIndex((trip) => trip.id === action.member.trip.id);
      let tripsWithUpdatedMembers = JSON.parse(JSON.stringify(state.trips));
      tripsWithUpdatedMembers[updatedTripMemberIndex] = action.member.trip;
      return {
        ...state,
        trips: tripsWithUpdatedMembers,
        viewedTrip: action.member.trip
      };
    default:
      return state;
  }
};

export default trips;
