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
  return {
    trip: state.trips.viewedTrip,
    expenses: state.expenses.tripExpenses,
    dataSource: dataSource.cloneWithRows(state.expenses.tripExpenses),
    isFetchingTripExpenses: state.expenses.isFetchingTripExpenses,
    session: state.session.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onExpensesLoad: (session, trip) => {
      dispatch(fetchTripExpenses(session, trip));
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
