import React from 'react';
import { connect } from 'react-redux';
import { View, AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import TripStackNavigator from '../components/TripStackNavigator'

const ActiveTripStackNavigator = connect(state => ({
  nav: state.nav
}))(({ dispatch, nav }) => {
  return (
    <TripStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('ActiveTripStackNavigator', () => ActiveTripStackNavigator);

export default ActiveTripStackNavigator;
