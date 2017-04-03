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
  container: {
    marginTop: 15
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
});

class AsyncIndicator extends Component {
  render() {
    const { active, errorMessage, onRetryPress } = this.props;
    let spinner = active ? <ActivityIndicator style={styles.container} size='large'/> : <View/>;
    let retryButton = !!onRetryPress ? <Button color={primaryColor} onPress={onRetryPress} title="Retry" accessibilityLabel="Retry fetching your trips" /> : <View/>;
    if (!!errorMessage) {
      return (
        <View style={styles.container}>
          <Text style={styles.error}>{errorMessage}</Text>
          {retryButton}
        </View>
      );
    }

    return spinner;
  }
}

AsyncIndicator.propTypes = {
  active: PropTypes.bool,
  errorMessage: PropTypes.string,
  onRetryPress: PropTypes.func
};

AppRegistry.registerComponent('AsyncIndicator', () => AsyncIndicator);

export default AsyncIndicator;
