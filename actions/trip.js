import { applyAuthenticationHeaders } from './helpers';
import { AsyncStorage } from 'react-native';

function startFetchingTrips() {
  return {
    type: 'START_FETCHING_TRIPS'
  }
}

function tripsFetchSuccess(trips) {
  return {
    type: 'TRIPS_FETCH_SUCCESS',
    trips: trips
  }
}

export const fetchTrips = () => {
  let url = 'http://localhost:3000/trips'

  return dispatch => {
    const { session } = dispatch(startFetchingTrips());

    return fetch(url, applyAuthenticationHeaders({ method: 'GET' }, session))
      .then(response => response.json())
      .then(json => dispatch(tripsFetchSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const addTrip = () => {
  return {
    type: 'NEW_TRIP'
  };
}

export const viewTrip = (trip) => {
  AsyncStorage.setItem('currentTrip', JSON.stringify(trip))
  return {
    type: 'VIEW_TRIP',
    trip: trip
  }
}

function startFetchingTrip() {
  return {
    type: 'START_FETCHING_TRIP'
  }
}

function tripFetchSuccess(trip) {
  AsyncStorage.setItem('currentTrip', JSON.stringify(trip))
  return {
    type: 'TRIP_FETCH_SUCCESS',
    trip
  }
}

export const reloadTrip = (trip) => {
  let url = `http://localhost:3000/trips/${trip.id}`

  return dispatch => {
    const { session } = dispatch(startFetchingTrip());

    return fetch(url, applyAuthenticationHeaders({ method: 'GET' }, session))
      .then(response => response.json())
      .then(json => dispatch(tripFetchSuccess(json)))
      .catch(error => console.log(error))
  };
}

export const setTripAttr = (attributeName, attributeValue) => {
  return {
    type: 'SET_TRIP_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

function startCreatingTrip() {
  return {
    type: 'START_CREATING_TRIP'
  }
}

function tripCreateSuccess(trip) {
  return {
    type: 'TRIP_CREATE_SUCCESS',
    trip: trip
  }
}

function startUpdatingTrip() {
  return {
    type: 'START_UPDATING_TRIP'
  }
}

function tripUpdateSuccess(trip) {
  return {
    type: 'TRIP_UPDATE_SUCCESS',
    trip: trip
  }
}

export const createTrip = (newTrip) => {
  let url = 'http://localhost:3000/trips'

  return dispatch => {
    const { session } = dispatch(startCreatingTrip())
    return fetch(url, applyAuthenticationHeaders({
      method: 'POST',
      body: JSON.stringify({trip: newTrip})
    }, session))
      .then(response => response.json())
      .then(json => dispatch(tripCreateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const cancelCreatingTrip = () => {
  return {
    type: 'CANCEL_NEW_TRIP'
  };
}

export const editTrip = function(trip) {
  return {
    type: 'EDIT_TRIP',
    trip: trip
  }
};

export const updateTrip = (editingTrip) => {
  let url = 'http://localhost:3000/trips/' + editingTrip.id

  return dispatch => {
    const { session } = dispatch(startUpdatingTrip())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: JSON.stringify({trip: editingTrip})
    }, session))
      .then(response => response.json())
      .then(json => dispatch(tripUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const cancelEditingTrip = () => {
  return {
    type: 'CANCEL_EDIT_TRIP'
  };
}

function startDeletingTrip() {
  return {
    type: 'START_DELETING_TRIP'
  }
}

function tripDeleteSuccess(trip) {
  return {
    type: 'TRIP_DELETE_SUCCESS',
    trip: trip
  }
}

export const deleteTrip = (trip) => {
  let url = 'http://localhost:3000/trips/' + trip.id

  return dispatch => {
    const { session } = dispatch(startDeletingTrip())
    return fetch(url, applyAuthenticationHeaders({
      method: 'DELETE'
    }, session))
      .then(_response => dispatch(tripDeleteSuccess(trip)))
      .catch(error => console.log(error))
  }
}

function startUpdatingTripImage() {
  return {
    type: 'START_UPDATING_TRIP_IMAGE'
  }
}

function tripImageUpdateSuccess(trip) {
  return {
    type: 'TRIP_IMAGE_UPDATE_SUCCESS',
    trip: trip
  }
}

export const updateTripImage = (trip, image) => {
  let url = 'http://localhost:3000/trips/' + trip.id;
  const body = new FormData();

  body.append('trip[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    const { session } = dispatch(startUpdatingTripImage())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: body
    }, session))
      .then(response => response.json())
      .then(json => dispatch(tripImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}
