import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry
} from 'react-native';

let styles = StyleSheet.create({
  positiveAmount: {

  },
  negativeAmount: {
    color: 'red',
    opacity: 0.7
  }
});

class MoneyView extends Component {
  render() {
    let amountStr;

    if (!this.props.round) {
      amountStr = (Math.round(this.props.amount * 100) / 100).toString();
      if (amountStr.indexOf('.') === -1) {
        amountStr = `${amountStr}.00`;
      } else if (amountStr.split('.')[1].length === 1) {
        amountStr = `${amountStr}0`;
      }
    } else {
      amountStr = Math.round(this.props.amount).toString();
    }

    let moneyStyle = this.props.amount * 1 < 0 ? styles.negativeAmount : styles.positiveAmount;

    amountStr = amountStr.replace('-', '');

    return (
      <Text {...this.props}>
        <Text style={moneyStyle}>${amountStr}</Text>
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
