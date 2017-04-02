// @flow

import { applyAuthenticationHeaders, parseResponse } from './helpers';
import { expenseObligationPaymentFailure, obligationsFetchFailure } from './error_actions';

function startFetchingExpenseObligations() {
  return {
    type: 'START_FETCHING_EXPENSE_OBLIGATIONS'
  }
}

function expenseObligationsFetchSuccess(obligations) {
  return {
    type: 'EXPENSE_OBLIGATIONS_FETCH_SUCCESS',
    expenseObligations: obligations
  }
}

export const fetchExpenseObligations = (expense) => {
  return dispatch => {
    const { session } = dispatch(startFetchingExpenseObligations())
    const { url, method } = expense.actions.view_obligations;

    return fetch(url, applyAuthenticationHeaders({ method: method }, session))
      .then(parseResponse(200, 'There was an error retrieving expense obligations. Please try again.'))
      .then(json => dispatch(expenseObligationsFetchSuccess(json)))
      .catch(error => dispatch(obligationsFetchFailure(error)))
  }
}

export const viewExpenseObligation = (obligation) => {
  return {
    type: 'VIEW_OBLIGATION',
    obligation
  }
}

function startPayingExpenseObligation() {
  return {
    type: 'START_PAYING_EXPENSE_OBLIGATION'
  }
}

function expenseObligationPaymentSuccess(obligation) {
  return {
    type: 'EXPENSE_OBLIGATION_PAYMENT_SUCCESS',
    obligation
  }
}

export const payExpenseObligation = (obligation) => {
  return dispatch => {
    const { session } = dispatch(startPayingExpenseObligation());
    const { url, method } = obligation.actions.pay;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({expense_obligation: {user_id: obligation.user.id}})
    }, session))
      .then(parseResponse(200, 'There was an error marking expense paid. Please try again.'))
      .then(json => dispatch(expenseObligationPaymentSuccess(json)))
      .catch(error => dispatch(expenseObligationPaymentFailure(error)))
  }
}
