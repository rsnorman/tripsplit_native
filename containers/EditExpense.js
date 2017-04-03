// @flow

import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setEditExpenseAttr, updateExpense, deleteExpense, cancelEditingExpense } from '../actions/expense_actions';
import ExpenseForm from '../components/ExpenseForm'

const mapStateToProps = (state) => {
  const {
    isSavingExpense,
    isDeletingExpense,
    errorMessage,
    editingExpense,
    isValidExpense
  } = state.expenses;

  return {
    title: 'Edit Expense',
    showDeleteButton: !!editingExpense.actions.delete,
    expense: editingExpense,
    isSavingExpense,
    isDeletingExpense,
    errorMessage,
    saveButtonDisabled: isSavingExpense || isDeletingExpense || !isValidExpense,
    deleteButtonDisabled: isSavingExpense || isDeletingExpense
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseAttributeSet: (attributeName: string, attributeValue: string) => {
      dispatch(setEditExpenseAttr(attributeName, attributeValue));
    },
    onSave: (expense) => {
      dispatch(updateExpense(expense));
    },
    onCancel: () => {
      dispatch(cancelEditingExpense());
    },
    onDelete: (expense) => {
      dispatch(deleteExpense(expense));
    }
  };
};

const EditExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm);

AppRegistry.registerComponent('EditExpense', () => EditExpense);

export default EditExpense;
