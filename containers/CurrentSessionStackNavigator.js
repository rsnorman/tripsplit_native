import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import SessionStackNavigator from './../components/SessionStackNavigator';
import { popSessionStackScreen } from '../actions/navigation_actions';

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
    return <SessionStackNavigator navigation={this.props.navigationHelpers} />
  }
}

const CurrentSessionStackNavigator = connect(state => ({
  nav: state.sessionNav
}))(({ dispatch, nav }) => {
  const navigationHelpers = addNavigationHelpers({ dispatch, state: nav });
  return <Navigator onBackButtonPress={() => { dispatch(popSessionStackScreen()) }} navigationHelpers={navigationHelpers} />;
});

AppRegistry.registerComponent('CurrentSessionStackNavigator', () => CurrentSessionStackNavigator);

export default CurrentSessionStackNavigator;
