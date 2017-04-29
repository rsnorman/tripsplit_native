import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  ActivityIndicator,
  View,
  AppRegistry
} from 'react-native';

import { primaryColor, dangerColor } from './../constants';

let styles = StyleSheet.create({
  container: {
    marginTop: 15
  },
  error: {
    color: dangerColor,
    textAlign: 'center'
  }
});

class AsyncIndicator extends Component {
  render() {
    const { active, onRetryPress, size } = this.props;
    let { errorMessage } = this.props;
    if (errorMessage) {
      errorMessage = typeof errorMessage === 'string' ? errorMessage : 'There was an error. Please try again';
    }

    let spinner = active ? <ActivityIndicator style={styles.container} size={size || 'large'}/> : <View/>;
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
  size: PropTypes.string,
  errorMessage: PropTypes.any,
  onRetryPress: PropTypes.func
};

AppRegistry.registerComponent('AsyncIndicator', () => AsyncIndicator);

export default AsyncIndicator;
