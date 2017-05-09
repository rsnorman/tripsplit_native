// @flow

import { isInvalidForm } from './../../helpers/form-validation';

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
  isValidExpense: false,
  uploadPhotoErrorMessage: null
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
        isValidExpense: false,
        isViewingNewExpenseForm: true,
        newExpense: newTripExpense
      };
    case 'SET_NEW_EXPENSE_ATTRIBUTE':
      let newExpense = {...state.newExpense};
      newExpense[action.name] = action.value;

      return {
        ...state,
        newExpense,
        isValidExpense: !isInvalidForm(newExpense, ['name', {cost: 'currency'}])
      };
    case 'SET_EDIT_EXPENSE_ATTRIBUTE':
      let editingExpense = {...state.editingExpense};
      editingExpense[action.name] = action.value;

      return {
        ...state,
        editingExpense,
        isValidExpense: !isInvalidForm(editingExpense, ['name', {cost: 'currency'}])
      };
    case 'START_CREATING_EXPENSE':
      return {
        ...state,
        isSavingExpense: true,
        errorMessage: null
      };
    case 'EXPENSE_CREATE_SUCCESS':
      return {
        ...state,
        tripExpenses: [action.expense, ...state.tripExpenses],
        isSavingExpense: false,
        isViewingNewExpenseForm: false,
        viewedExpense: action.expense
      };
    case 'SAVE_EXPENSE_ERROR':
      return {
        ...state,
        isSavingExpense: false,
        errorMessage: action.error
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
        isValidExpense: false
      };
    case 'START_UPDATING_EXPENSE':
      return {
        ...state,
        isSavingExpense: true,
        errorMessage: null
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
        isUploadingExpenseImage: true,
        uploadPhotoErrorMessage: null
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
    case 'UPDATE_EXPENSE_PHOTO_ERROR':
      return {
        ...state,
        isUploadingExpenseImage: false,
        uploadPhotoErrorMessage: action.error
      };
    case 'START_DELETING_EXPENSE':
      return {
        ...state,
        errorMessage: null,
        isDeletingExpense: true,
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
    case 'DELETE_EXPENSE_ERROR':
      return {
        ...state,
        isDeletingExpense: false,
        errorMessage: action.error
      };
    case 'EXPENSE_OBLIGATION_ACTIVATE_SUCCESS':
    case 'EXPENSE_OBLIGATION_ANNULMENT_SUCCESS':
      return {
        ...state,
        viewedExpense: action.obligation.expense,
      };
    default:
      return state;
  }
};

export default expenses;
