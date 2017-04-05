import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';

import SessionStackNavigator from './../components/SessionStackNavigator';

const CurrentSessionStackNavigator = connect(state => ({
  nav: state.sessionNav
}))(({ dispatch, nav }) => {
  return (
    <SessionStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('CurrentSessionStackNavigator', () => CurrentSessionStackNavigator);

export default CurrentSessionStackNavigator;
