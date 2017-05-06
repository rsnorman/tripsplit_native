import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import TripStackNavigator from '../components/TripStackNavigator';
import { popTripStackScreen } from '../actions/navigation_actions';

class Navigator extends Component {
  _handleBackButtonPress() {
    this.props.onBackButtonPress();
    return true;
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
  }

  render() {
    return <TripStackNavigator navigation={this.props.navigationHelpers} />
  }
}

const ActiveTripStackNavigator = connect(state => ({
  nav: state.nav
}))(({ dispatch, nav }) => {
  const navigationHelpers = addNavigationHelpers({ dispatch, state: nav });
  return <Navigator onBackButtonPress={() => { dispatch(popTripStackScreen()) }} navigationHelpers={navigationHelpers} />;
});

AppRegistry.registerComponent('ActiveTripStackNavigator', () => ActiveTripStackNavigator);

export default ActiveTripStackNavigator;
