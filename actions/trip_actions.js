// @flow

import { applyAuthenticationHeaders } from './helpers';
import { AsyncStorage } from 'react-native';
import { baseUrl } from './../constants';
import { tripsFetchFailure, tripSaveFailure } from './error_actions';

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
  let url = `${baseUrl}/trips`

  return dispatch => {
    const { session } = dispatch(startFetchingTrips());

    return fetch(url, applyAuthenticationHeaders({ method: 'GET' }, session))
      .then(response => {
        if (response.status !== 200) {
          throw('There was an error retrieving trips. Please try again.');
        }

        return response.json();
      })
      .then(json => dispatch(tripsFetchSuccess(json)))
      .catch(error => dispatch(tripsFetchFailure(error)))
  }
}

export const addTrip = () => {
  return {
    type: 'NEW_TRIP'
  };
}

export const viewTrip = (trip) => {
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
  return {
    type: 'TRIP_FETCH_SUCCESS',
    trip
  }
}

export const reloadTrip = (trip) => {
  return dispatch => {
    const { session } = dispatch(startFetchingTrip());
    const { url, method } = trip.actions.show;

    return fetch(url, applyAuthenticationHeaders({ method: method }, session))
      .then(response => response.json())
      .then(json => dispatch(tripFetchSuccess(json)))
      .catch(error => console.log(error))
  };
}

export const setNewTripAttr = (attributeName: string, attributeValue: string) => {
  return {
    type: 'SET_NEW_TRIP_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

export const setEditTripAttr = (attributeName: string, attributeValue: string) => {
  return {
    type: 'SET_EDIT_TRIP_ATTRIBUTE',
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
  let url = `${baseUrl}/trips`

  return dispatch => {
    const { session } = dispatch(startCreatingTrip())
    return fetch(url, applyAuthenticationHeaders({
      method: 'POST',
      body: JSON.stringify({trip: newTrip})
    }, session))
      .then(response => {
        if (response.status !== 200) {
          throw('There was an error saving. Please try again.');
        }

        return response.json();
      })
      .then(json => dispatch(tripCreateSuccess(json)))
      .catch(error => dispatch(tripSaveFailure(error)))
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
  return dispatch => {
    const { session } = dispatch(startUpdatingTrip());
    const { url, method } = editingTrip.actions.update;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({trip: editingTrip})
    }, session))
      .then(response => {
        if (response.status !== 200) {
          throw('There was an error saving. Please try again.');
        }

        return response.json();
      })
      .then(json => dispatch(tripUpdateSuccess(json)))
      .catch(error => dispatch(tripSaveFailure(error)))
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
  return dispatch => {
    const { session } = dispatch(startDeletingTrip());
    const { url, method } = trip.actions.delete;

    return fetch(url, applyAuthenticationHeaders({
      method: method
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
  const body = new FormData();

  body.append('trip[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    const { session } = dispatch(startUpdatingTripImage());
    const { url, method } = trip.actions.update;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: body
    }, session))
      .then(response => response.json())
      .then(json => dispatch(tripImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}
