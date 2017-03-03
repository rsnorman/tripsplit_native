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

class TripsList extends Component {
  rowPressed(tripId) {
    let trip = this.props.trips.filter(trip => trip.id === tripId)[0];
    this.props.onTripSelected(trip);
  }

  onAddTripPressed() {
    this.props.onTripAdd();
  }

  renderRow(rowData, sectionID, rowID) {
    let pictureIcon = rowData.picture.url ?
      ( <Image source={{uri: 'http://localhost:3000' + rowData.picture.thumb.url}} style={styles.thumb} /> ) :
      (
        <View style={styles.thumb}>
          <Icon name="car" style={styles.thumbIcon} size={50} color="#fff" />
        </View>
      );

    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            {pictureIcon}
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
        <TouchableHighlight
          style={styles.addTripButton}
          onPress={this.onAddTripPressed.bind(this)}
          underlayColor="#54CBFD">
          <Icon name="plus-circle" style={styles.addIcon} />
        </TouchableHighlight>
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
