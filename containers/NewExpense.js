import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setNewExpenseAttr, createExpense, cancelCreatingExpense } from '../actions/expense_actions';
import ExpenseForm from '../components/ExpenseForm'

const mapStateToProps = (state) => {
  const {
    isSavingExpense,
    errorMessage,
    newExpense,
    saveButtonDisabled
  } = state.expenses;

  return {
    title: 'Create Expense',
    expense: newExpense,
    isSavingExpense,
    errorMessage,
    saveButtonDisabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseAttributeSet: (attributeName: string, attributeValue: string) => {
      dispatch(setNewExpenseAttr(attributeName, attributeValue));
    },
    onSave: (newExpense) => {
      dispatch(createExpense(newExpense));
    },
    onCancel: () => {
      dispatch(cancelCreatingExpense());
    }
  };
};

const NewExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseForm);

AppRegistry.registerComponent('NewExpense', () => NewExpense);

export default NewExpense;
