import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { updateExpenseImage } from '../actions/expense_actions';
import ExpenseView from './../components/ExpenseView'

const mapStateToProps = (state) => {
  return {
    expense: state.expenses.viewedExpense,
    isViewingEditExpenseForm: state.expenses.isViewingEditExpenseForm,
    isUploadingExpenseImage: state.trips.isUploadingExpenseImage,
    isFetchingObligations: true
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseImageChanged: (expense, image) => {
      dispatch(updateExpenseImage(expense, image))
    }
  };
};

const VisibleExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseView);

AppRegistry.registerComponent('VisibleExpense', () => VisibleExpense);

export default VisibleExpense;
