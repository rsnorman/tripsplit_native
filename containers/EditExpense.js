import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setExpenseAttr, updateExpense, deleteExpense, cancelEditingExpense } from '../actions/expense_actions';
import ExpenseForm from '../components/ExpenseForm'

const mapStateToProps = (state) => {
  return {
    title: 'Edit Expense',
    showDeleteButton: !state.expenses.editingExpense.actions.delete,
    expense: state.expenses.editingExpense,
    isSavingExpense: state.expenses.isSavingExpense,
    isDeletingExpense: state.expenses.isDeletingExpense
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseAttributeSet: (attributeName, attributeValue) => {
      dispatch(setExpenseAttr(attributeName, attributeValue));
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
