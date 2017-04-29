import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  AppRegistry
} from 'react-native';

import { primaryColor, secondaryColor } from './../constants';

let styles = StyleSheet.create({
  button: {
    paddingBottom: 7,
    paddingRight: 10,
    paddingTop: 7,
    paddingLeft: 7
  },
  disabledText: {
    opacity: 0.7,
    color: secondaryColor
  }
});

class HeaderButton extends Component {
  render() {
    const { text, color, onPress, bold, disabled } = this.props;
    const textStyle = StyleSheet.create({
      text: {
        fontSize: 16,
        fontWeight: bold ? 'bold': 'normal',
        color: color || primaryColor
      }
    });

    if (disabled) {
      return <View style={styles.button}><Text style={[textStyle.text, styles.disabledText]}>{text}</Text></View>
    }

    return (
      <TouchableHighlight
        style={styles.button}
        onPress={onPress}
        underlayColor="transparent">
        <Text style={textStyle.text}>{text}</Text>
      </TouchableHighlight>
    );
  }
}

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  bold: PropTypes.bool,
  disabled: PropTypes.bool
};

AppRegistry.registerComponent('HeaderButton', () => HeaderButton);

export default HeaderButton;
