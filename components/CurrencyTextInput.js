import React, { Component, PropTypes } from 'react';

import {
  TextInput,
  AppRegistry
} from 'react-native';

import { primaryColor, secondaryColor } from './../constants';

class CurrencyTextInput extends Component {
  render() {
    const {
      amount,
      onChange
    } = this.props;

    return (
      <TextInput
        {...this.props}
        value={amount}
        selectTextOnFocus={true}
        keyboardType="numeric"
        underlineColorAndroid={secondaryColor}
        onChange={onChange} />
    );
  }
}

CurrencyTextInput.propTypes = {
  amount: PropTypes.any,
  onChange: PropTypes.func
};

AppRegistry.registerComponent('CurrencyTextInput', () => CurrencyTextInput);

export default CurrencyTextInput;
