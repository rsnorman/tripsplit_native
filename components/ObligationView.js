import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';

import formStyles from '../styles/form';

let styles = StyleSheet.create({
  ...formStyles,
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15
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
    color: '#48bbec',
    alignSelf: 'center'
  },
  disableButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class ObligationView extends Component {
  static navigationOptions = {
    title: (navigation) => {
      return `${navigation.state.params.expense.name} Payment`;
    }
  };

  payObligation() {
    this.props.onObligationPaid(this.props.obligation);
  }

  render() {
    let {
      expense,
      obligation,
      showPayButton,
      payButtonDisabled,
      isPayingExpense,
      errorMessage
    } = this.props;

    let payButton = showPayButton ?
      (
        <FormButton
          onPress={this.payObligation.bind(this)}
          text="Mark As Paid" />
      ) :
      ( <View /> );

    let markAsPaidView = obligation.is_paid ?
      (
        <View style={styles.formRow}>
          <View style={styles.disableButton}>
            <Text style={styles.paidText}>Paid</Text>
          </View>
        </View>
      ) :
      payButton;

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
                <Text style={styles.obligatorLabel}>Payment required: {obligation.user.name}</Text>
              </View>
            </View>
          </View>
          <View style={styles.obligationDetails}>
            <Text style={styles.expenseName}>{expense.name}</Text>
            <Text style={styles.expensePurchaser}>{expense.purchaser.name}</Text>
            <Text style={styles.expenseDescription}>{expense.description}</Text>
          </View>
        </View>
        <View style={styles.form}>
          {markAsPaidView}
        </View>
        <AsyncIndicator
          active={isPayingExpense}
          errorMessage={errorMessage} />
      </View>
    );
  }
}

ObligationView.propTypes = {
  expense: PropTypes.object.isRequired
};

AppRegistry.registerComponent('ObligationView', () => ObligationView);

export default ObligationView;
