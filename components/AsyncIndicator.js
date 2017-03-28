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
    const { active, errorMessage } = this.props;
    let spinner = active ? <ActivityIndicator size='large'/> : <View/>;
    if (!!errorMessage) {
      return <Text style={styles.error}>{errorMessage}</Text>
    }

    return spinner;
  }
}

AsyncIndicator.propTypes = {
  active: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

AppRegistry.registerComponent('AsyncIndicator', () => AsyncIndicator);

export default AsyncIndicator;
