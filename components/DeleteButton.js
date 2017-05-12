import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Keyboard,
  AppRegistry
} from 'react-native';

import formStyles from '../styles/form';

import { dangerColor } from './../constants';

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
    backgroundColor: dangerColor,
    borderColor: dangerColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  disabledButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: dangerColor,
    borderColor: dangerColor,
    opacity: 0.4,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class DeleteButton extends Component {

  _keyboardDidShow() {
    this.setState({
      hideButton: true
    });
  }

  _keyboardDidHide() {
    this.setState({
      hideButton: false
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      hideButton: false
    };
  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {
    const { text, onPress, disabled, hidden } = this.props;

    if (hidden || this.state.hideButton) {
      return <View />;
    }

    if (disabled) {
      return (
        <View style={styles.formRow}>
          <TouchableHighlight style={styles.disabledButton}
            underlayColor={dangerColor}>
            <Text style={styles.buttonText}>{text || 'Delete'}</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.formRow}>
        <TouchableHighlight style={styles.button}
          onPress={onPress}
          underlayColor={dangerColor}>
          <Text style={styles.buttonText}>{text || 'Delete'}</Text>
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
