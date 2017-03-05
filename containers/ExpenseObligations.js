import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchExpenseObligations } from '../actions/obligation_actions';
import ObligationsList from '../components/ObligationsList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  return {
    expense: state.expenses.viewedExpense,
    obligations: state.obligations.expenseObligations,
    dataSource: dataSource.cloneWithRows(state.obligations.expenseObligations),
    isFetchingExpenseObligations: state.obligations.isFetchingExpenseObligations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onObligationsLoad: (expense) => {
      dispatch(fetchExpenseObligations(expense));
    }
  };
};

const ExpenseObligations = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObligationsList);

AppRegistry.registerComponent('ExpenseObligations', () => ExpenseObligations);

export default ExpenseObligations;
