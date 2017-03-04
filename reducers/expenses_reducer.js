let initialExpensesState = {
  tripExpenses: [],
  isFetchingTripExpenses: false,
  viewedExpense: null,
  isViewingEditExpenseForm: false
};

const expenses = (state = initialExpensesState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIP_EXPENSES':
      return Object.assign({}, state, {
        isFetchingTripExpenses: true
      })
    case 'TRIP_EXPENSES_FETCH_SUCCESS':
      return Object.assign({}, state, {
        isFetchingTripExpenses: false,
        tripExpenses: action.tripExpenses
      });
    case 'VIEW_EXPENSE':
      return Object.assign({}, state, {
        viewedExpense: action.expense
      });
    default:
      return state;
  }
};

export default expenses;
