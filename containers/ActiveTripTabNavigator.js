import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import TripTabNavigator from '../components/TripTabNavigator'
import { selectTripTab } from '../actions/trip_tab_actions'

const mapStateToProps = (state) => {
  return {
    activeTabIndex: state.tripTabs.activeTabIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTabSelect: (tabIndex) => {
      dispatch(selectTripTab(tabIndex));
    }
  };
};

const ActiveTripTabNavigator = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripTabNavigator);

AppRegistry.registerComponent('ActiveTripTabNavigator', () => ActiveTripTabNavigator);

export default ActiveTripTabNavigator;
