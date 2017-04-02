// @flow

import { applyAuthenticationHeaders, parseResponse } from './helpers';
import { expenseSaveFailure, expensesFetchFailure } from './error_actions';

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
  return dispatch => {
    const { session } = dispatch(startFetchingTripExpenses());
    const { url, method } = trip.actions.view_expenses;

    return fetch(url, applyAuthenticationHeaders({
      method: method
    }, session))
      .then(parseResponse(200, 'There was an error retrieving expenses. Please try again.'))
      .then(json => dispatch(tripExpensesFetchSuccess(json)))
      .catch(error => dispatch(expensesFetchFailure(error)))
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
export const setNewExpenseAttr = (attributeName: string, attributeValue: string) => {
  return {
    type: 'SET_NEW_EXPENSE_ATTRIBUTE',
    name: attributeName,
    value: attributeValue
  };
}

export const setEditExpenseAttr = (attributeName: string, attributeValue: string) => {
  return {
    type: 'SET_EDIT_EXPENSE_ATTRIBUTE',
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
  return dispatch => {
    const { session } = dispatch(startCreatingExpense());
    const { url, method } = newExpense.trip.actions.create_expense;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({expense: newExpense})
    }, session))
      .then(parseResponse(200, 'There was an error saving. Please try again.'))
      .then(json => dispatch(expenseCreateSuccess(json)))
      .catch(error => dispatch(expenseSaveFailure(error)))
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
  return dispatch => {
    const { session } = dispatch(startUpdatingExpense())
    const { url, method } = editingExpense.actions.update;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({expense: editingExpense})
    }, session))
      .then(parseResponse(200, 'There was an error saving. Please try again.'))
      .then(json => dispatch(expenseUpdateSuccess(json)))
      .catch(error => dispatch(expenseSaveFailure(error)))
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
  return dispatch => {
    const { session } = dispatch(startDeletingExpense())
    const { url, method } = expense.actions.delete;

    return fetch(url, applyAuthenticationHeaders({
      method: method
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
  const body = new FormData();

  body.append('expense[picture]', {
    uri: image.uri,
    type: 'image/jpeg',
    name: image.fileName
  });

  return dispatch => {
    const { session } = dispatch(startUpdatingExpenseImage())
    const { url, method } = expense.actions.update;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: body
    }, session))
      .then(response => response.json())
      .then(json => dispatch(expenseImageUpdateSuccess(json)))
      .catch(error => console.log(error))
  }
}
