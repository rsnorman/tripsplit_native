/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import AppRoot from './containers/AppRoot';
import RootNavigator from './components/RootNavigator';
import store from './tripsplit-store';

export default class TripSplitApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppRoot />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TripSplit', () => TripSplitApp);
