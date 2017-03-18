import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import ProfileStackNavigator from '../components/ProfileStackNavigator'

const UserProfileStackNavigator = connect(state => ({
  nav: state.profileNav
}))(({ dispatch, nav }) => {
  return (
    <ProfileStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('UserProfileStackNavigator', () => UserProfileStackNavigator);

export default UserProfileStackNavigator;
