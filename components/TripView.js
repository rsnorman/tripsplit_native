import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicator,
  Dimensions,
  Modal,
  AppRegistry
} from 'react-native';

let ScreenHeight = Dimensions.get("window").height;

import Icon from 'react-native-vector-icons/FontAwesome';

import NewTrip from './../containers/NewTrip'

let styles = StyleSheet.create({
  container: {
    height: ScreenHeight - 64
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: '#48bbec'
  },
  thumbIcon: {
    padding: 12
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 18
  },
  location: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  cost: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  members: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  addTripButton: {
    width: 50,
    height: 50,
    backgroundColor: '#48bbec',
    borderRadius: 25,
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  addIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
    marginLeft: 12,
    fontSize: 30,
    color: 'white',
  },
});

class TripView extends Component {
  static navigationOptions = {
    title: (navigation, childRouter) => {
      return navigation.state.params.trip.name ;
    }
  };

  render() {
    let spinner = this.props.isFetchingExpenses ?
      <ActivityIndicator size='large'/> :
      <View />;

    return (
      <View style={styles.container}>
        {spinner}
        <TouchableHighlight
          style={styles.addExpenseButton}
          onPress={this.props.onAddExpensePressed.bind(this)}
          underlayColor="#54CBFD">
          <Icon name="plus-circle" style={styles.addIcon} />
        </TouchableHighlight>
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingNewExpenseForm}>
          <NewTrip />
        </Modal>
      </View>
    );
  }
}

TripView.propTypes = {
};

AppRegistry.registerComponent('TripView', () => TripView);

export default TripView;
