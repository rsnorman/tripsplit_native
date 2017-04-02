import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  AppRegistry
} from 'react-native';

let styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#99d9f4',
    borderColor: '#99d9f4',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class FormButton extends Component {
  render() {
    const { text, onPress, disabled } = this.props;
    if (disabled) {
      return (
        <TouchableHighlight style={styles.disabledButton}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>{text}</Text>
        </TouchableHighlight>
      );
    }
    return (
      <TouchableHighlight style={styles.button}
        onPress={onPress}
        underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>{text}</Text>
      </TouchableHighlight>
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
