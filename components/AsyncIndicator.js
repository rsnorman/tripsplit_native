import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  AppRegistry
} from 'react-native';

let styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

class AsyncIndicator extends Component {
  render() {
    const { active, errorMessage, style } = this.props;
    let spinner = active ? <ActivityIndicator style={style} size='large'/> : <View/>;
    if (!!errorMessage) {
      return (
        <View style={style}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      );
    }

    return spinner;
  }
}

AsyncIndicator.propTypes = {
  style: PropTypes.any,
  active: PropTypes.bool,
  errorMessage: PropTypes.string
};

AppRegistry.registerComponent('AsyncIndicator', () => AsyncIndicator);

export default AsyncIndicator;
