import React, { Component } from 'react';
import {
  View,
  Modal,
  StatusBar
} from 'react-native';

import NewSession from '../containers/NewSession';
import ActiveAccount from '../containers/ActiveAccount';

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: 'TripSplit',
  };

  render() {
    let isLoggedIn = !!this.props.session;
    let statusBarStyle = !isLoggedIn ? 'light-content' : 'dark-content';
    let currentAccountView = isLoggedIn ?
      ( <ActiveAccount /> ) :
      ( <View /> );

    return (
      <View>
        <StatusBar barStyle={statusBarStyle} />
        <Modal animationType={'slide'} transparent={false} visible={!isLoggedIn}>
          <NewSession />
        </Modal>
        {currentAccountView}
      </View>
    );
  }
}
