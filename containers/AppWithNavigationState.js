import React from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers } from  'react-navigation';
import AppNavigator from '../components/AppNavigator'

const AppWithNavigationState = connect(state => ({
  nav: state.nav,
  isLoggedIn: !!state.session.session
}))(({ dispatch, nav }) => {
  return (
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

export default AppWithNavigationState;
