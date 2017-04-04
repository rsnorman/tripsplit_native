import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button, View } from 'react-native';
import { editExpense } from '../actions/expense_actions';
import { primaryColor } from './../constants';

const mapStateToProps = (state) => {
  let expense = state.expenses.viewedExpense;
  return {
    expense,
    isVisible: !!expense.actions.update
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBeginEditingExpense: (expense) => {
      dispatch(editExpense(expense));
    }
  };
};

const EditExpenseButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ expense, isVisible, onBeginEditingExpense }) => {
  if (!isVisible) {
    return <View />;
  }

  return (
    <Button
      color={primaryColor}
      title='Edit'
      onPress={() => onBeginEditingExpense(expense)}
    />
  );
});

AppRegistry.registerComponent('EditExpenseButton', () => EditExpenseButton);

export default EditExpenseButton;
