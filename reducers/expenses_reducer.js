// @flow

import { isInvalidForm } from './../helpers/form-validation';

let initialExpensesState = {
  tripExpenses: [],
  newExpense: {
    name: null,
    cost: null,
    description: null
  },
  isFetchingTripExpenses: false,
  isSavingExpense: false,
  isDeletingExpense: false,
  viewedExpense: null,
  isViewingNewExpenseForm: false,
  isViewingEditExpenseForm: false,
  editingExpense: null,
  fetchExpensesErrorMessage: null,
  errorMessage: null,
  saveButtonDisabled: true
};

const expenses = (state = initialExpensesState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIP_EXPENSES':
      return {
        ...state,
        tripExpenses: [],
        isFetchingTripExpenses: true,
        fetchExpensesErrorMessage: null
      };
    case 'TRIP_EXPENSES_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTripExpenses: false,
        tripExpenses: action.tripExpenses
      };
    case 'FETCH_EXPENSES_ERROR':
      return {
        ...state,
        isFetchingTripExpenses: false,
        fetchExpensesErrorMessage: action.error
      };
    case 'NEW_EXPENSE':
      let newTripExpense = {
        trip: action.trip,
        name: null,
        cost: null,
        description: null,
        expense_type: 'dollar'
      };
      return {
        ...state,
        errorMessage: null,
        saveButtonDisabled: true,
        isViewingNewExpenseForm: true,
        newExpense: newTripExpense
      };
    case 'SET_NEW_EXPENSE_ATTRIBUTE':
      let newExpense = {...state.newExpense};
      newExpense[action.name] = action.value;

      return {
        ...state,
        newExpense,
        saveButtonDisabled: isInvalidForm(newExpense, ['name', {cost: 'currency'}])
      };
    case 'SET_EDIT_EXPENSE_ATTRIBUTE':
      let editingExpense = {...state.editingExpense};
      editingExpense[action.name] = action.value;

      return {
        ...state,
        editingExpense,
        saveButtonDisabled: isInvalidForm(editingExpense, ['name', {cost: 'currency'}])
      };
    case 'START_CREATING_EXPENSE':
      return {
        ...state,
        isSavingExpense: true,
        errorMessage: null,
        saveButtonDisabled: true
      };
    case 'EXPENSE_CREATE_SUCCESS':
      return {
        ...state,
        tripExpenses: [action.expense, ...state.tripExpenses],
        isSavingExpense: false,
        isViewingNewExpenseForm: false,
        viewedExpense: action.expense
      };
    case 'CANCEL_NEW_EXPENSE':
      return {
        ...state,
        isViewingNewExpenseForm: false
      };
    case 'VIEW_EXPENSE':
      return {
        ...state,
        viewedExpense: action.expense
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        editingExpense: action.expense,
        isViewingEditExpenseForm: true,
        errorMessage: null,
        saveButtonDisabled: true
      };
    case 'START_UPDATING_EXPENSE':
      return {
        ...state,
        isSavingExpense: true,
        errorMessage: null,
        saveButtonDisabled: true
      };
    case 'EXPENSE_UPDATE_SUCCESS':
      let updatedExpenseIndex = state.tripExpenses.findIndex((expense) => expense.id === action.expense.id);
      let expensesWithUpdated = JSON.parse(JSON.stringify(state.tripExpenses));
      expensesWithUpdated[updatedExpenseIndex] = action.expense;

      return {
        ...state,
        tripExpenses: expensesWithUpdated,
        viewedExpense: action.expense,
        isSavingExpense: false,
        isViewingEditExpenseForm: false
      };
    case 'CANCEL_EDIT_EXPENSE':
      return {
        ...state,
        isViewingEditExpenseForm: false
      };
    case 'START_UPDATING_EXPENSE_IMAGE':
      return {
        ...state,
        isUploadingExpenseImage: true
      };
    case 'EXPENSE_IMAGE_UPDATE_SUCCESS':
      let updatedExpenseImageIndex = state.tripExpenses.findIndex((expense) => expense.id === action.expense.id);
      let expensesWithUpdatedImage = JSON.parse(JSON.stringify(state.tripExpenses));
      expensesWithUpdatedImage[updatedExpenseImageIndex] = action.expense;

      return {
        ...state,
        tripExpenses: expensesWithUpdatedImage,
        viewedExpense: action.expense,
        isUploadingExpenseImage: false
      };
    case 'START_DELETING_EXPENSE':
      return {
        ...state,
        errorMessage: null,
        isDeletingExpense: true
      };
    case 'EXPENSE_DELETE_SUCCESS':
      let deletedExpenseIndex = state.tripExpenses.findIndex((expense) => expense.id === action.expense.id);
      let expensesWithoutDeleted = JSON.parse(JSON.stringify(state.tripExpenses));
      expensesWithoutDeleted.splice(deletedExpenseIndex, 1)

      return {
        ...state,
        tripExpenses: expensesWithoutDeleted,
        isDeletingExpense: false,
        isViewingEditExpenseForm: false
      };
    case 'SAVE_EXPENSE_ERROR':
      return {
        ...state,
        isSavingExpense: false,
        saveButtonDisabled: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default expenses;
