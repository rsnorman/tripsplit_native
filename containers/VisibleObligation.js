import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { payExpenseObligation } from '../actions/obligation_actions';
import ObligationView from './../components/ObligationView'

const mapStateToProps = (state) => {
  const {
    viewedObligation,
    isPayingExpense,
    errorMessage,
    payButtonDisabled
  } = state.obligations;

  return {
    obligation: viewedObligation,
    expense: state.expenses.viewedExpense,
    showPayButton: !!viewedObligation.actions.pay,
    isPayingExpense,
    errorMessage,
    payButtonDisabled
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
