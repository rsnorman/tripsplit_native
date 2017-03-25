import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  AppRegistry
} from 'react-native';

import Money from './../components/MoneyView';

let styles = StyleSheet.create({
  oweContainer: {
    flex: 1,
    alignItems: 'center'
  },
  oweContainerLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8d8d8d'
  }
});

class OweAmount extends Component {
  render() {
    let { amount } = this.props;
    amount = amount * 1;
    let text = amount > 0 ? 'Owes you' : 'You owe';
    amount = Math.abs(amount);

    return (
      <View style={styles.oweContainer}>
        <Text style={styles.oweContainerLabel}>{text}: <Money amount={amount} /></Text>
      </View>
    );
  }
}

OweAmount.propTypes = {
  amount: PropTypes.any.isRequired,
};

AppRegistry.registerComponent('OweAmount', () => OweAmount);

export default OweAmount;
