import { applyAuthenticationHeaders } from './helpers';

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

export const fetchTripExpenses = (trip) => {
  let url = 'http://localhost:3000/trips/' + trip.id + '/expenses';

  return dispatch => {
    const { session } = dispatch(startFetchingTripExpenses())
    return fetch(url, applyAuthenticationHeaders({
      method: 'GET'
    }, session))
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

export const createExpense = (newExpense) => {
  let url = 'http://localhost:3000/trips/' + newExpense.trip_id + '/expenses'

  return dispatch => {
    const { session } = dispatch(startCreatingExpense())
    return fetch(url, applyAuthenticationHeaders({
      method: 'POST',
      body: JSON.stringify({expense: newExpense})
    }, session))
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

export const updateExpense = (editingExpense) => {
  let url = 'http://localhost:3000/trips/' + editingExpense.trip_id + '/expenses/' + editingExpense.id

  return dispatch => {
    const { session } = dispatch(startUpdatingExpense())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: JSON.stringify({expense: editingExpense})
    }, session))
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

export const deleteExpense = (expense) => {
  let url = 'http://localhost:3000/trips/' + expense.trip_id + '/expenses/' + expense.id;

  return dispatch => {
    const { session } = dispatch(startDeletingExpense())
    return fetch(url, applyAuthenticationHeaders({
      method: 'DELETE'
    }, session))
      .then(response => response.json())
      .then(json => dispatch(expenseDeleteSuccess(json)))
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

export const updateExpenseImage = (expense, image) => {
  let url = 'http://localhost:3000/trips/' + expense.trip_id + '/expenses/' + expense.id;
  const body = new FormData();

  body.append('expense[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    const { session } = dispatch(startUpdatingExpenseImage())
    return fetch(url, applyAuthenticationHeaders({
      method: 'PUT',
      body: body
    }, session))
      .then(response => response.json())
      .then(json => dispatch(expenseImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}
