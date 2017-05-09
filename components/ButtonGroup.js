import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  AppRegistry
} from 'react-native';

const ScreenWidth = Dimensions.get("window").width;

let styles = StyleSheet.create({
  buttonGroup: {
    position: 'absolute',
    bottom: 20,
    width: ScreenWidth,
    paddingLeft: 20,
    paddingRight: 20
  }
});

class ButtonGroup extends Component {
  render() {
    return (
      <View style={styles.buttonGroup}>
        {this.props.children}
      </View>
    );
  }
}

AppRegistry.registerComponent('ButtonGroup', () => ButtonGroup);

export default ButtonGroup;
