import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button } from 'react-native';
import { editExpense } from '../actions/expense_actions';

const mapStateToProps = (state) => {
  return {
    expense: state.expenses.viewedExpense,
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
)(({ expense, onBeginEditingExpense }) => {
  return (
    <Button
      title='Edit'
      onPress={() => onBeginEditingExpense(expense)}
    />
  );
});

AppRegistry.registerComponent('EditExpenseButton', () => EditExpenseButton);

export default EditExpenseButton;
