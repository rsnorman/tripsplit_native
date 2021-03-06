let initialObligationsState = {
  expenseObligations: [],
  isFetchingExpenseObligations: false,
  isPayingExpense: false,
  fetchObligationsErrorMessage: null,
  errorMessage: null,
  isRemovingObligationPayment: false,
  isAnnullingObligation: false,
  isActivatingObligation: false
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
    case 'START_REMOVING_EXPENSE_OBLIGATION_PAYMENT':
      return {
        ...state,
        isRemovingObligationPayment: true,
        errorMessage: null
      };
    case 'EXPENSE_OBLIGATION_PAYMENT_REMOVAL_SUCCESS':
      let unpaidObligationIndex = state.expenseObligations.findIndex((obligation) => obligation.id === action.obligation.id);
      let obligationsWithUnpaid = JSON.parse(JSON.stringify(state.expenseObligations));
      obligationsWithUnpaid[unpaidObligationIndex] = action.obligation;

      return {
        ...state,
        expenseObligations: obligationsWithUnpaid,
        viewedObligation: action.obligation,
        isRemovingObligationPayment: false,
      }
    case 'EXPENSE_OBLIGATION_PAYMENT_REMOVAL_ERROR':
      return {
        ...state,
        isRemovingObligationPayment: false,
        errorMessage: action.error
      };
    case 'START_ANNULLING_EXPENSE_OBLIGATION':
      return {
        ...state,
        isAnnullingObligation: true,
        errorMessage: null
      };
    case 'EXPENSE_OBLIGATION_ANNULMENT_SUCCESS':
      return {
        ...state,
        expenseObligations: action.obligation.expense.obligations,
        viewedObligation: action.obligation,
        isAnnullingObligation: false,
      }
    case 'EXPENSE_OBLIGATION_ANNULMENT_ERROR':
      return {
        ...state,
        isAnnullingObligation: false,
        errorMessage: action.error
      };
    case 'START_ACTIVATING_EXPENSE_OBLIGATION':
      return {
        ...state,
        isActivatingObligation: true,
        errorMessage: null
      };
    case 'EXPENSE_OBLIGATION_ACTIVATE_SUCCESS':
      return {
        ...state,
        expenseObligations: action.obligation.expense.obligations,
        viewedObligation: action.obligation,
        isActivatingObligation: false,
      }
    case 'EXPENSE_OBLIGATION_ACTIVATE_ERROR':
      return {
        ...state,
        isActivatingObligation: false,
        errorMessage: action.error
      };
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
