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

export const viewExpense = (expense) => {
  return {
    type: 'VIEW_EXPENSE',
    expense
  }
}

export const addExpense = (trip) => {
  return {
    type: 'NEW_EXPENSE',
    trip
  };
}

export const setExpenseAttr = (attributeName, attributeValue) => {
  return {
    type: 'SET_EXPENSE_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

function startCreatingExpense() {
  return {
    type: 'START_CREATING_EXPENSE'
  }
}

function expenseCreateSuccess(expense) {
  return {
    type: 'EXPENSE_CREATE_SUCCESS',
    expense
  }
}

export const createExpense = (session, newExpense) => {
  let url = 'http://localhost:3000/trips/' + newExpense.trip_id + '/expenses'

  return dispatch => {
    dispatch(startCreatingExpense())
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({expense: newExpense}),
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
      .then(json => dispatch(expenseCreateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const cancelCreatingExpense = () => {
  return {
    type: 'CANCEL_NEW_EXPENSE'
  };
}

export const editExpense = function(expense) {
  return {
    type: 'EDIT_EXPENSE',
    expense
  }
};

function startUpdatingExpense() {
  return {
    type: 'START_UPDATING_EXPENSE'
  }
}

function expenseUpdateSuccess(expense) {
  return {
    type: 'EXPENSE_UPDATE_SUCCESS',
    expense
  }
}

export const updateExpense = (session, editingExpense) => {
  let url = 'http://localhost:3000/trips/' + editingExpense.trip_id + '/expenses/' + editingExpense.id

  return dispatch => {
    dispatch(startUpdatingExpense())
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify({expense: editingExpense}),
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
      .then(json => dispatch(expenseUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}

export const cancelEditingExpense = () => {
  return {
    type: 'CANCEL_EDIT_EXPENSE'
  };
}

function startDeletingExpense() {
  return {
    type: 'START_DELETING_EXPENSE'
  }
}

function expenseDeleteSuccess(expense) {
  return {
    type: 'EXPENSE_DELETE_SUCCESS',
    expense
  }
}

export const deleteExpense = (session, expense) => {
  let url = 'http://localhost:3000/trips/' + expense.trip_id + '/expenses/' + expense.id;

  return dispatch => {
    dispatch(startDeletingExpense())
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
      .then(_response => dispatch(expenseDeleteSuccess(expense)))
      .catch(error => console.log(error))
  }
}

function startUpdatingExpenseImage() {
  return {
    type: 'START_UPDATING_EXPENSE_IMAGE'
  }
}

function expenseImageUpdateSuccess(expense) {
  return {
    type: 'EXPENSE_IMAGE_UPDATE_SUCCESS',
    expense
  }
}

export const updateExpenseImage = (session, expense, image) => {
  let url = 'http://localhost:3000/trips/' + expense.trip_id + '/expenses/' + expense.id;
  const body = new FormData();

  body.append('expense[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    dispatch(startUpdatingExpenseImage())
    return fetch(url, {
      method: 'PUT',
      body: body,
      headers: {
        'Accept': 'application/json',
        "Token-Type": "Bearer",
        'Access-Token': session.accessToken,
        'Client': session.client,
        "Expiry": session.expiry,
        "uid": session.uid
      }
    })
      .then(response => response.json())
      .then(json => dispatch(expenseImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}
