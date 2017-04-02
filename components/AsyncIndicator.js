import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  View,
  AppRegistry
} from 'react-native';

import { primaryColor } from './../constants'

let styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

class AsyncIndicator extends Component {
  render() {
    const { active, errorMessage, style, onRetryPress } = this.props;
    let spinner = active ? <ActivityIndicator style={style} size='large'/> : <View/>;
    let retryButton = !!onRetryPress ? <Button color={primaryColor} onPress={onRetryPress} title="Retry" accessibilityLabel="Retry fetching your trips" /> : <View/>;
    if (!!errorMessage) {
      return (
        <View style={style}>
          <Text style={styles.error}>{errorMessage}</Text>
          {retryButton}
        </View>
      );
    }

    return spinner;
  }
}

AsyncIndicator.propTypes = {
  style: PropTypes.any,
  active: PropTypes.bool,
  errorMessage: PropTypes.string,
  onRetryPress: PropTypes.func
};

AppRegistry.registerComponent('AsyncIndicator', () => AsyncIndicator);

export default AsyncIndicator;
