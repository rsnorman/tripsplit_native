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

import ListImage from './../components/ListImage';
import NewTrip from './../containers/NewTrip';
import FloatingButton from './../components/FloatingButton';

let styles = StyleSheet.create({
  container: {
    height: ScreenHeight - 64
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
  }
});

class TripsList extends Component {
  rowPressed(tripId) {
    let trip = this.props.trips.filter(trip => trip.id === tripId)[0];
    this.props.onTripSelected(trip);
  }

  onAddTripPressed() {
    this.props.onTripAdd();
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <ListImage size={80} image={rowData.picture} icon="car" />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {rowData.name}
              </Text>
              <Text style={styles.location} numberOfLines={1}>
                {rowData.location}
              </Text>
              <Text style={styles.cost} numberOfLines={1}>
                ${rowData.total_cost}
              </Text>
              <Text style={styles.members} numberOfLines={1}>
                {rowData.total_members} {rowData.total_members == 1 ? 'member' : 'members'}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isFetchingTrips) {
      return <ActivityIndicator size='large'/>
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.props.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
        <FloatingButton icon="plus-circle" size={50} onButtonPressed={this.onAddTripPressed.bind(this)} />
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingNewTripForm}>
          <NewTrip />
        </Modal>
      </View>
    );
  }
}

TripsList.propTypes = {
  dataSource: PropTypes.object.isRequired
};

AppRegistry.registerComponent('TripsList', () => TripsList);

export default TripsList;
