import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, View } from 'react-native';
import HeaderButton from './../components/HeaderButton';
import { editExpense } from '../actions/expense_actions';

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
    <HeaderButton
      text="Edit"
      onPress={() => onBeginEditingExpense(expense)}
    />
  );
});

AppRegistry.registerComponent('EditExpenseButton', () => EditExpenseButton);

export default EditExpenseButton;
