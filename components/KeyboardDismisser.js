import React, { Component } from 'react';

import {
  Keyboard,
  TouchableWithoutFeedback,
  AppRegistry
} from 'react-native';

class KeyboardDismisser extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {this.props.children}
      </TouchableWithoutFeedback>
    );
  }
}

AppRegistry.registerComponent('KeyboardDismisser', () => KeyboardDismisser);

export default KeyboardDismisser;
