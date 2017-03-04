import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { updateExpenseImage } from '../actions/expense_actions';
import ExpenseView from './../components/ExpenseView'

const mapStateToProps = (state) => {
  return {
    session: state.session.session,
    expense: state.expenses.viewedExpense,
    isViewingEditExpenseForm: state.trips.isViewingEditExpenseForm
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpenseImageChanged: (session, expense, image) => {
      dispatch(updateExpenseImage(session, expense, image))
    }
  };
};

const VisibleExpense = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpenseView);

AppRegistry.registerComponent('VisibleExpense', () => VisibleExpense);

export default VisibleExpense;
