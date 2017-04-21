import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';

let styles = StyleSheet.create({
  emptyContainer: {
    flexDirection: 'row'
  },
  emptyText: {
    flex: 1,
    textAlign: 'center',
    color: '#adadad',
    margin: 50,
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
});

class EmptyMessage extends Component {
  render() {
    const { text, hidden } = this.props;

    if (hidden) {
      return <View />;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{text}</Text>
      </View>
    );
  }
}

EmptyMessage.propTypes = {
  text: PropTypes.string.isRequired,
  hidden: PropTypes.bool.isRequired
};

AppRegistry.registerComponent('EmptyMessage', () => EmptyMessage);

export default EmptyMessage;
