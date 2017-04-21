import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  AppRegistry
} from 'react-native';

import formStyles from '../styles/form';

let styles = StyleSheet.create({
  ...formStyles,
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    opacity: 0.4,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class DeleteButton extends Component {
  render() {
    const { onPress, disabled, hidden } = this.props;

    if (hidden) {
      return <View />;
    }

    if (disabled) {
      return (
        <View style={styles.formRow}>
          <TouchableHighlight style={styles.disabledButton}
            underlayColor='red'>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.formRow}>
        <TouchableHighlight style={styles.button}
          onPress={onPress}
          underlayColor='red'>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

DeleteButton.propTypes = {
  hidden: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

AppRegistry.registerComponent('DeleteButton', () => DeleteButton);

export default DeleteButton;
