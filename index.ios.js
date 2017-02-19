/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppWithNavigationState from './containers/AppWithNavigationState'

import tripSplitApp from './reducers';

let store = createStore(tripSplitApp, applyMiddleware(thunk));

export default class TripSplitApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('TripSplitNative', () => TripSplitApp);
