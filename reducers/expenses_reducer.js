let initialExpensesState = {
  tripExpenses: [],
  newExpense: {
    name: null,
    cost: null,
    description: null
  },
  isFetchingTripExpenses: false,
  viewedExpense: null,
  isViewingNewExpenseForm: false
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
    case 'NEW_EXPENSE':
      let newTripExpense = {
        trip_id: action.trip.id,
        name: 'Gas',
        cost: '90',
        description: 'Another fill-up',
        expense_type: 'money'
      };
      return Object.assign({}, state, {
        isViewingNewExpenseForm: true,
        newExpense: newTripExpense
      });
    case 'SET_EXPENSE_ATTRIBUTE':
      let newExpense = Object.assign({}, state.newExpense);
      newExpense[action.name] = action.value;

      let editingExpense = Object.assign({}, state.editingExpense);
      editingExpense[action.name] = action.value;

      return Object.assign({}, state, {
        newExpense,
        editingExpense
      });
    case 'START_CREATING_EXPENSE':
      return Object.assign({}, state, {
        isSavingExpense: true
      });
    case 'EXPENSE_CREATE_SUCCESS':
      console.log('Expense create success', action.expense)
      return Object.assign({}, state, {
        tripExpenses: [action.expense, ...state.tripExpenses],
        isSavingExpense: false,
        isViewingNewExpenseForm: false,
        viewedExpense: action.expense
      });
    case 'CANCEL_NEW_EXPENSE':
      return Object.assign({}, state, {
        isViewingNewExpenseForm: false
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
