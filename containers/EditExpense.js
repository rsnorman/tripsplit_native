import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setExpenseAttr, updateExpense, deleteExpense, cancelEditingExpense } from '../actions/expense_actions';
import ExpenseForm from '../components/ExpenseForm'

const mapStateToProps = (state) => {
  return {
    title: 'Edit Expense',
    showDeleteButton: true,
    expense: state.expenses.editingExpense,
    isSavingExpense: state.expenses.isSavingExpense,
    isDeletingExpense: state.expenses.isDeletingExpense,
    session: state.session.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseAttributeSet: (attributeName, attributeValue) => {
      dispatch(setExpenseAttr(attributeName, attributeValue));
    },
    onSave: (session, expense) => {
      dispatch(updateExpense(session, expense));
    },
    onCancel: () => {
      dispatch(cancelEditingExpense());
    },
    onDelete: (session, expense) => {
      dispatch(deleteExpense(session, expense));
    }
  };
};

const EditExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm);

AppRegistry.registerComponent('EditExpense', () => EditExpense);

export default EditExpense;
