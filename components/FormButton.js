import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  AppRegistry
} from 'react-native';

import formStyles from '../styles/form';
import formButtonStyles from '../styles/form-button';

let styles = StyleSheet.create({...formStyles, ...formButtonStyles});

class FormButton extends Component {
  render() {
    const { text, onPress, disabled } = this.props;

    if (disabled) {
      return (
        <View style={styles.formRow}>
          <TouchableHighlight style={styles.disabledButton}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>{text}</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.formRow}>
        <TouchableHighlight style={styles.button}
          onPress={onPress}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

FormButton.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

AppRegistry.registerComponent('FormButton', () => FormButton);

export default FormButton;
