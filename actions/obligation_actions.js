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
