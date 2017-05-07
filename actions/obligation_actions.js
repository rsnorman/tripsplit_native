// @flow

import { applyAuthenticationHeaders, parseResponse } from './helpers';
import {
  expenseObligationPaymentFailure,
  obligationsFetchFailure,
  expenseObligationPaymentRemoveFailure,
  expenseObligationAnnulFailure,
  expenseObligationActivateFailure
} from './error_actions';

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

function startRemovingExpenseObligationPayment() {
  return {
    type: 'START_REMOVING_EXPENSE_OBLIGATION_PAYMENT'
  }
}

function expenseObligationPaymentRemoveSuccess(obligation) {
  return {
    type: 'EXPENSE_OBLIGATION_PAYMENT_REMOVAL_SUCCESS',
    obligation
  }
}

export const removeObligationPayment = (obligation) => {
  return dispatch => {
    const { session } = dispatch(startRemovingExpenseObligationPayment());
    const { url, method } = obligation.actions.unpay;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({expense_obligation: {user_id: obligation.user.id}})
    }, session))
      .then(parseResponse(200, 'There was an error marking expense unpaid. Please try again.'))
      .then(json => dispatch(expenseObligationPaymentRemoveSuccess(json)))
      .catch(error => dispatch(expenseObligationPaymentRemoveFailure(error)))
  }
}

function startAnnullingExpenseObligation() {
  return {
    type: 'START_ANNULLING_EXPENSE_OBLIGATION'
  }
}

function expenseObligationAnnulSuccess(obligation) {
  return {
    type: 'EXPENSE_OBLIGATION_ANNULMENT_SUCCESS',
    obligation
  }
}

export const annulObligation = (obligation) => {
  return dispatch => {
    const { session } = dispatch(startAnnullingExpenseObligation());
    const { url, method } = obligation.actions.destroy;

    return fetch(url, applyAuthenticationHeaders({
      method: method
    }, session))
      .then(parseResponse(200, 'There was an error removing expense obligation. Please try again.'))
      .then(json => dispatch(expenseObligationAnnulSuccess(json)))
      .catch(error => dispatch(expenseObligationAnnulFailure(error)))
  }
}

function startActivatingExpenseObligation() {
  return {
    type: 'START_ACTIVATING_EXPENSE_OBLIGATION'
  }
}

function expenseObligationActivateSuccess(obligation) {
  return {
    type: 'EXPENSE_OBLIGATION_ACTIVATE_SUCCESS',
    obligation
  }
}

export const activateObligation = (obligation) => {
  return dispatch => {
    const { session } = dispatch(startActivatingExpenseObligation());
    const { url, method } = obligation.actions.activate;

    return fetch(url, applyAuthenticationHeaders({
      method: method
    }, session))
      .then(parseResponse(200, 'There was an error activating expense obligation. Please try again.'))
      .then(json => dispatch(expenseObligationActivateSuccess(json)))
      .catch(error => dispatch(expenseObligationActivateFailure(error)))
  }
}
