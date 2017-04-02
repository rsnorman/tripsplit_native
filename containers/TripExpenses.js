import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchTripExpenses, viewExpense } from '../actions/expense_actions';
import ExpensesList from '../components/ExpensesList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  const {
    tripExpenses,
    isFetchingTripExpenses,
    fetchExpensesErrorMessage
  } = state.expenses;

  return {
    trip: state.trips.viewedTrip,
    expenses: tripExpenses,
    dataSource: dataSource.cloneWithRows(tripExpenses),
    isFetchingTripExpenses,
    fetchExpensesErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpensesLoad: (trip) => {
      dispatch(fetchTripExpenses(trip));
    },
    onExpenseSelected: (expense) => {
      dispatch(viewExpense(expense));
    }
  };
};

const TripExpenses = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesList);

AppRegistry.registerComponent('TripExpenses', () => TripExpenses);

export default TripExpenses;
