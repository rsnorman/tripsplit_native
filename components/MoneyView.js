import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  AppRegistry
} from 'react-native';

class MoneyView extends Component {
  render() {
    let amountStr = (Math.round(this.props.amount * 100) / 100).toString();
    if (amountStr.indexOf('.') === -1) {
      amountStr = `${amountStr}.00`;
    } else if (amountStr.split('.')[1].length === 1) {
      amountStr = `${amountStr}0`;
    }

    return (
      <Text {...this.props}>
        ${amountStr}
      </Text>
    );
  }
}

MoneyView.propTypes = {
  amount: PropTypes.any.isRequired
};

AppRegistry.registerComponent('MoneyView', () => MoneyView);

export default MoneyView;
