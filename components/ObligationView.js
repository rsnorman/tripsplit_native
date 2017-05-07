import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  Dimensions,
  AppRegistry
} from 'react-native';

import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';
import DeleteButton from './DeleteButton';

const ScreenWidth = Dimensions.get("window").width;
import formStyles from '../styles/form';
import { primaryColor, backgroundColor } from './../constants';

let styles = StyleSheet.create({
  ...formStyles,
  container: {
    flex: 1
  },
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    backgroundColor
  },
  obligationHeader: {
    flexDirection: 'row'
  },
  obligationHeaderRightColumn: {
    flex: 1
  },
  obligationCostDetails: {
    flex: 1,
    flexDirection: 'row'
  },
  obligator: {
    flex: 1,
    alignItems: 'center'
  },
  obligatorLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8d8d8d'
  },
  obligationDetail: {
    flex: 2,
    alignItems: 'center',
  },
  obligationDetailValue: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  obligationDetailLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8d8d8d'
  },
  expenseName: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  expensePurchaser: {
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 3
  },
  expenseDescription: {
    fontStyle: 'italic',
    color: '#3d3d3d'
  },
  paidText: {
    fontSize: 18,
    color: primaryColor,
    alignSelf: 'center'
  },
  disableButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 20,
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20
  }
});

class ObligationView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.expense.name} Payment`,
    headerTintColor: primaryColor,
    headerTitleStyle: { color: 'black' }
  });

  payObligation() {
    this.props.onObligationPaid(this.props.obligation);
  }

  removeObligationPayment() {
    this.props.onRemoveObligationPayment(this.props.obligation);
  }

  annulObligation() {
    this.props.onAnnulObligation(this.props.obligation);
  }

  activateObligation() {
    this.props.onActivateObligation(this.props.obligation);
  }

  render() {
    const {
      expense,
      obligation,
      showPayButton,
      showUnpayButton,
      showAnnulButton,
      showActivateButton,
      payButtonDisabled,
      annulButtonDisabled,
      activateButtonDisabled,
      isPayingExpense,
      isRemovingObligationPayment,
      isAnnullingObligation,
      isActivatingObligation,
      errorMessage
    } = this.props;

    let payButton = showPayButton ?
      (
        <FormButton
          onPress={this.payObligation.bind(this)}
          disabled={payButtonDisabled}
          text="Mark As Paid" />
      ) :
      ( <View /> );

    let removePaymentButton = showUnpayButton ?
      (
        <DeleteButton
          onPress={this.removeObligationPayment.bind(this)}
          disabled={payButtonDisabled}
          text="Mark As Unpaid" />
      ) :
      ( <View /> );

    let annulPaymentButton = showAnnulButton ?
      (
        <DeleteButton
          onPress={this.annulObligation.bind(this)}
          disabled={annulButtonDisabled}
          text="Remove" />
      ) :
      ( <View /> );

    let activatePaymentButton = showActivateButton ?
      (
        <FormButton
          onPress={this.activateObligation.bind(this)}
          disabled={activateButtonDisabled}
          text="Re-add" />
      ) :
      ( <View /> );

    let markAsPaidView = obligation.is_paid ? removePaymentButton : payButton;

    const paymentLabel = obligation.is_paid ? `Already paid by ${obligation.user.name}` : `Payment required from ${obligation.user.name}`;

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.obligationHeader}>
            <HeaderImage
              image={expense.picture}
              size={80}
              icon={this.props.expense.expense_type} />
            <View style={styles.obligationHeaderRightColumn}>
              <View style={styles.obligationCostDetails}>
                <View style={styles.obligationDetail}>
                  <Money style={styles.obligationDetailValue} amount={expense.average_cost} />
                  <Text style={styles.obligationDetailLabel}>Payment</Text>
                </View>
                <View style={styles.obligationDetail}>
                  <Money style={styles.obligationDetailValue} amount={expense.cost} />
                  <Text style={styles.obligationDetailLabel}>Group Cost</Text>
                </View>
              </View>
              <View style={styles.obligator}>
                <Text style={styles.obligatorLabel}>{paymentLabel}</Text>
              </View>
            </View>
          </View>
          <View style={styles.obligationDetails}>
            <Text style={styles.expenseName}>{expense.name}</Text>
            <Text style={styles.expensePurchaser}>{expense.purchaser.name}</Text>
            <Text style={styles.expenseDescription}>{expense.description}</Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <AsyncIndicator
            active={isPayingExpense || isRemovingObligationPayment || isAnnullingObligation || isActivatingObligation}
            errorMessage={errorMessage} />
          {markAsPaidView}
          {annulPaymentButton}
          {activatePaymentButton}
        </View>
      </View>
    );
  }
}

ObligationView.propTypes = {
  expense: PropTypes.object.isRequired
};

AppRegistry.registerComponent('ObligationView', () => ObligationView);

export default ObligationView;
