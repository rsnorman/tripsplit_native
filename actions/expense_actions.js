function startFetchingTripExpenses() {
  return {
    type: 'START_FETCHING_TRIP_EXPENSES'
  }
}

function tripExpensesFetchSuccess(expenses) {
  return {
    type: 'TRIP_EXPENSES_FETCH_SUCCESS',
    tripExpenses: expenses
  }
}

export const fetchTripExpenses = (session, trip) => {
  let url = 'http://localhost:3000/trips/' + trip.id + '/expenses';

  return dispatch => {
    dispatch(startFetchingTripExpenses())
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
      .then(json => dispatch(tripExpensesFetchSuccess(json)))
      .catch(error => console.log(error))
  }
}
