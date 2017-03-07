import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { payExpenseObligation } from '../actions/obligation_actions';
import ObligationView from './../components/ObligationView'

const mapStateToProps = (state) => {
  return {
    expense: state.expenses.viewedExpense,
    obligation: state.obligations.viewedObligation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onObligationPaid: (obligation) => {
      dispatch(payExpenseObligation(obligation))
    }
  };
};

const VisibleObligation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObligationView);

AppRegistry.registerComponent('VisibleObligation', () => VisibleObligation);

export default VisibleObligation;
