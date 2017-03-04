let initialObligationsState = {
  expenseObligations: [],
  isFetchingExpenseObligations: false,
};

const obligations = (state = initialObligationsState, action) => {
  switch (action.type) {
    case 'START_FETCHING_EXPENSE_OBLIGATION':
      return Object.assign({}, state, {
        isFetchingExpenseObligations: true
      })
    case 'EXPENSE_OBLIGATIONS_FETCH_SUCCESS':
      return Object.assign({}, state, {
        isFetchingExpenseObligations: false,
        expenseObligations: action.expenseObligations
      });
    default:
      return state;
  }
};

export default obligations;
