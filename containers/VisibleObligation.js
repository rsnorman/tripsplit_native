import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { payExpenseObligation, removeObligationPayment } from '../actions/obligation_actions';
import ObligationView from './../components/ObligationView'

const mapStateToProps = (state) => {
  const {
    viewedObligation,
    isPayingExpense,
    isRemovingObligationPayment,
    errorMessage
  } = state.obligations;

  return {
    obligation: viewedObligation,
    expense: state.expenses.viewedExpense,
    showPayButton: !!viewedObligation.actions.pay,
    showUnpayButton: !!viewedObligation.actions.unpay,
    isPayingExpense,
    isRemovingObligationPayment,
    errorMessage,
    payButtonDisabled: isPayingExpense || isRemovingObligationPayment
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onObligationPaid: (obligation) => {
      dispatch(payExpenseObligation(obligation))
    },
    onRemoveObligationPayment: (obligation) => {
      dispatch(removeObligationPayment(obligation));
    }
  };
};

const VisibleObligation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObligationView);

AppRegistry.registerComponent('VisibleObligation', () => VisibleObligation);

export default VisibleObligation;
