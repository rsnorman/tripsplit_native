import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchExpenseObligations, viewExpenseObligation } from '../actions/obligation_actions';
import ObligationsList from '../components/ObligationsList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  const {
    expenseObligations,
    isFetchingExpenseObligations,
    fetchObligationsErrorMessage
  } = state.obligations;

  return {
    expense: state.expenses.viewedExpense,
    obligations: expenseObligations,
    dataSource: dataSource.cloneWithRows(expenseObligations),
    isFetchingExpenseObligations,
    fetchObligationsErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onObligationsLoad: (expense) => {
      dispatch(fetchExpenseObligations(expense));
    },
    onObligationSelected: (obligation) => {
      dispatch(viewExpenseObligation(obligation));
    }
  };
};

const ExpenseObligations = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObligationsList);

AppRegistry.registerComponent('ExpenseObligations', () => ExpenseObligations);

export default ExpenseObligations;
