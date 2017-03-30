// @flow

import { applyAuthenticationHeaders } from './helpers'

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
      .then(response => response.json())
      .then(json => dispatch(expenseObligationsFetchSuccess(json)))
      .catch(error => console.log(error))
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

function expenseObligationPaymentFailure(error: string) {
  return {
    type: 'PAY_EXPENSE_OBLIGATION_ERROR',
    error
  };
}

export const payExpenseObligation = (obligation) => {
  return dispatch => {
    const { session } = dispatch(startPayingExpenseObligation());
    const { url, method } = obligation.actions.pay;

    return fetch(url, applyAuthenticationHeaders({
      method: method,
      body: JSON.stringify({expense_obligation: {user_id: obligation.user.id}})
    }, session))
      .then(response => {
        if (response.status !== 200) {
          throw('There was an error marking expense paid. Please try again.');
        }

        return response.json();
      })
      .then(json => dispatch(expenseObligationPaymentSuccess(json)))
      .catch(error => dispatch(expenseObligationPaymentFailure(error)))
  }
}
