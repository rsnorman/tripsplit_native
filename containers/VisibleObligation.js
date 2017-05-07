import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { payExpenseObligation, removeObligationPayment, annulObligation, activateObligation } from '../actions/obligation_actions';
import ObligationView from './../components/ObligationView'

const mapStateToProps = (state) => {
  const {
    viewedObligation,
    isPayingExpense,
    isRemovingObligationPayment,
    isAnnullingObligation,
    isActivatingObligation,
    errorMessage
  } = state.obligations;

  return {
    obligation: viewedObligation,
    expense: state.expenses.viewedExpense,
    showPayButton: !!viewedObligation.actions.pay,
    showUnpayButton: !!viewedObligation.actions.unpay,
    showAnnulButton: !!viewedObligation.actions.destroy,
    showActivateButton: !!viewedObligation.actions.activate,
    isPayingExpense,
    isRemovingObligationPayment,
    isAnnullingObligation,
    isActivatingObligation,
    errorMessage,
    payButtonDisabled: isPayingExpense || isRemovingObligationPayment || isAnnullingObligation || isActivatingObligation,
    annulButtonDisabled: isPayingExpense || isRemovingObligationPayment || isAnnullingObligation || isActivatingObligation,
    activateButtonDisabled: isPayingExpense || isRemovingObligationPayment || isAnnullingObligation || isActivatingObligation
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onObligationPaid: (obligation) => {
      dispatch(payExpenseObligation(obligation))
    },
    onRemoveObligationPayment: (obligation) => {
      dispatch(removeObligationPayment(obligation));
    },
    onAnnulObligation: (obligation) => {
      dispatch(annulObligation(obligation));
    },
    onActivateObligation: (obligation) => {
      dispatch(activateObligation(obligation));
    }
  };
};

const VisibleObligation = connect(
  mapStateToProps,
  mapDispatchToProps
)(ObligationView);

AppRegistry.registerComponent('VisibleObligation', () => VisibleObligation);

export default VisibleObligation;
