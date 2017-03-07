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
  let url = 'http://localhost:3000/expenses/' + expense.id + '/obligations';

  return dispatch => {
    const { session } = dispatch(startFetchingExpenseObligations())
    return fetch(url, applyAuthenticationHeaders({ method: 'GET' }, session))
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

export const payExpenseObligation = (obligation) => {
  let url = `http://localhost:3000/expenses/${obligation.expense_id}/contributions`;

  return dispatch => {
    const { session } = dispatch(startPayingExpenseObligation())
    return fetch(url, applyAuthenticationHeaders({
      method: 'POST',
      body: JSON.stringify({expense_contribution: {is_paid: true}})
    }, session))
      .then(response => response.json())
      .then(json => dispatch(expenseObligationPaymentSuccess(json)))
      .catch(error => console.log(error))
  }
}
