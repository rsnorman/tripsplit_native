let initialExpensesState = {
  tripExpenses: [],
  isFetchingTripExpenses: false,
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
    default:
      return state;
  }
};

export default expenses;
