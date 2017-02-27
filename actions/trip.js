function startFetchingTrips() {
  return {
    type: 'START_FETCHING_TRIPS'
  }
}

function tripFetchSuccess(trips) {
  return {
    type: 'TRIP_FETCH_SUCCESS',
    trips: trips
  }
}

export const fetchTrips = (session) => {
  let url = 'http://localhost:3000/trips'

  return dispatch => {
    dispatch(startFetchingTrips())
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token-Type": "Bearer",
        'Access-Token': session.accessToken,
        'Client': session.client,
        "Expiry": session.expiry,
        "uid": session.uid
      }
    })
      .then(response => response.json())
      .then(json => dispatch(tripFetchSuccess(json)))
      .catch(error => console.log(error))
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

export const createTrip = (session, newTrip) => {
  let url = 'http://localhost:3000/trips'

  return dispatch => {
    dispatch(startCreatingTrip())
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({trip: newTrip}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token-Type": "Bearer",
        'Access-Token': session.accessToken,
        'Client': session.client,
        "Expiry": session.expiry,
        "uid": session.uid
      }
    })
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

export const updateTrip = (session, editingTrip) => {
  let url = 'http://localhost:3000/trips/' + editingTrip.id

  return dispatch => {
    dispatch(startUpdatingTrip())
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify({trip: editingTrip}),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token-Type": "Bearer",
        'Access-Token': session.accessToken,
        'Client': session.client,
        "Expiry": session.expiry,
        "uid": session.uid
      }
    })
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

export const deleteTrip = (session, trip) => {
  let url = 'http://localhost:3000/trips/' + trip.id

  return dispatch => {
    dispatch(startDeletingTrip())
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Token-Type": "Bearer",
        'Access-Token': session.accessToken,
        'Client': session.client,
        "Expiry": session.expiry,
        "uid": session.uid
      }
    })
      .then(_response => dispatch(tripDeleteSuccess(trip)))
      .catch(error => console.log(error))
  }
}
