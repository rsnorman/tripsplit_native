import React, { Component } from 'react';
import {
  View,
  Modal,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  AppRegistry
} from 'react-native';

import NewSession from '../containers/NewSession';
import ActiveAccount from '../containers/ActiveAccount';

var styles = StyleSheet.create({
  spinner: {
    marginTop: 50
  }
});

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'TripSplit',
  };

  componentDidMount() {
    this.props.onHomeScreenLoaded();
  }

  render() {
    let isInitializing = this.props.isInitializing;
    let isLoggedIn = !!this.props.session;
    let statusBarStyle = !isLoggedIn ? 'light-content' : 'dark-content';
    let spinner = isInitializing ?
      ( <ActivityIndicator style={styles.spinner} size="large" /> ) :
      ( <View /> );
    let currentAccountView = isLoggedIn ?
      ( <ActiveAccount /> ) :
      ( <View /> );

    return (
      <View>
        <StatusBar barStyle={statusBarStyle} />
        {spinner}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={!isLoggedIn && !isInitializing}>
          <NewSession />
        </Modal>
        {currentAccountView}
      </View>
    );
  }
}

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);

export default HomeScreen;
