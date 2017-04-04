import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  Button,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryColor } from './../constants';
import ActiveTripStackNavigator from './../containers/ActiveTripStackNavigator';

let styles = StyleSheet.create({
});

class TripView extends Component {
  static navigationOptions = {
    title: 'Current Trip'
  };

  render() {
    return (
      <View>
        <ActiveTripStackNavigator />
      </View>
    );
  }
}

TripView.propTypes = {
  trip: PropTypes.object.isRequired
};

AppRegistry.registerComponent('TripView', () => TripView);

export default TripView;
