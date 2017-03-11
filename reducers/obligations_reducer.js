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
    case 'VIEW_OBLIGATION':
      return {
        ...state,
        viewedObligation: action.obligation
      };
    case 'EXPENSE_OBLIGATION_PAYMENT_SUCCESS':
      let paidObligationIndex = state.expenseObligations.findIndex((obligation) => obligation.id === action.obligation.id);
      let obligationsWithPaid = JSON.parse(JSON.stringify(state.expenseObligations));
      obligationsWithPaid[paidObligationIndex] = action.obligation;

      return {
        ...state,
        expenseObligations: obligationsWithPaid,
        viewedObligation: action.obligation
      }
    case 'EXPENSE_UPDATE_SUCCESS':
      return {
        ...state,
        expenseObligations: action.expense.obligations
      };
    default:
      return state;
  }
};

export default obligations;
