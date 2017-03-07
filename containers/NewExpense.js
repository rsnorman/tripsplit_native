import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setExpenseAttr, createExpense, cancelCreatingExpense } from '../actions/expense_actions';
import ExpenseForm from '../components/ExpenseForm'

const mapStateToProps = (state) => {
  return {
    title: 'Create Expense',
    expense: state.expenses.newExpense,
    isSavingExpense: state.expenses.isSavingExpense
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseAttributeSet: (attributeName, attributeValue) => {
      dispatch(setExpenseAttr(attributeName, attributeValue));
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
