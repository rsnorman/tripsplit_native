import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry
} from 'react-native';

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
      amountStr = Math.round(this.props.amount).toString()
    }

    return (
      <Text {...this.props}>
        ${amountStr}
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
