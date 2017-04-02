let initialObligationsState = {
  expenseObligations: [],
  isFetchingExpenseObligations: false,
  isPayingExpense: false,
  fetchObligationsErrorMessage: null,
  errorMessage: null,
  payButtonDisabled: true
};

const obligations = (state = initialObligationsState, action) => {
  switch (action.type) {
    case 'START_FETCHING_EXPENSE_OBLIGATIONS':
      return {
        ...state,
        expenseObligations: [],
        isFetchingExpenseObligations: true,
        fetchObligationsErrorMessage: null
      };
    case 'EXPENSE_OBLIGATIONS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingExpenseObligations: false,
        expenseObligations: action.expenseObligations
      };
    case 'FETCH_OBLIGATIONS_ERROR':
      return {
        ...state,
        isFetchingExpenseObligations: false,
        fetchObligationsErrorMessage: action.error
      };
    case 'VIEW_OBLIGATION':
      return {
        ...state,
        viewedObligation: action.obligation,
        errorMessage: null,
        payButtonDisabled: true
      };
    case 'START_PAYING_EXPENSE_OBLIGATION':
      return {
        ...state,
        isPayingExpense: true,
        errorMessage: null,
        payButtonDisabled: true
      };
    case 'EXPENSE_OBLIGATION_PAYMENT_SUCCESS':
      let paidObligationIndex = state.expenseObligations.findIndex((obligation) => obligation.id === action.obligation.id);
      let obligationsWithPaid = JSON.parse(JSON.stringify(state.expenseObligations));
      obligationsWithPaid[paidObligationIndex] = action.obligation;

      return {
        ...state,
        expenseObligations: obligationsWithPaid,
        viewedObligation: action.obligation,
        isPayingExpense: false,
      }
    case 'PAY_EXPENSE_OBLIGATION_ERROR':
      return {
        ...state,
        isPayingExpense: false,
        payButtonDisabled: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default obligations;
