import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry
} from 'react-native';

import { negativeColor } from './../constants';

let styles = StyleSheet.create({
  positiveAmount: {

  },
  negativeAmount: {
    color: negativeColor,
    opacity: 0.7
  }
});

class MoneyView extends Component {
  render() {
    let { amount, round } = this.props;
    if (round) {
      amount = Math.round(amount * 1).toString();
    }

    let moneyStyle = amount * 1 < 0 ? styles.negativeAmount : styles.positiveAmount;

    amount = amount.toString().replace('-', '');

    return (
      <Text {...this.props}>
        <Text style={moneyStyle}>${amount}</Text>
      </Text>
    );
  }
}

MoneyView.propTypes = {
  amount: PropTypes.any.isRequired,
  round: PropTypes.bool
};

AppRegistry.registerComponent('MoneyView', () => MoneyView);

export default MoneyView;
