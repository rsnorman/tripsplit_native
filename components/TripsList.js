import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  Modal,
  AppRegistry
} from 'react-native';

import ListImage from './../components/ListImage';
import NewTrip from './../containers/NewTrip';
import FloatingButton from './../components/FloatingButton';
import Money from './../components/MoneyView';
import AsyncIndicator from './../components/AsyncIndicator';
import EmptyMessage from './../components/EmptyMessageView';
import OpenDrawerButton from './../containers/OpenDrawerButton';
import { primaryColor } from './../constants';

let styles = StyleSheet.create({
  container: {
    flex: 1
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
  spinner: {
    marginTop: 10
  }
});

class TripsList extends Component {
  static navigationOptions = {
    title: 'Trips',
    header: () => ({
      left: (
        <OpenDrawerButton />
      )
    }),
    tintColor: primaryColor,
    titleStyle: { color: 'black' }
  };

  componentDidMount() {
    this._loadTrips();
  }

  rowPressed(tripId) {
    let trip = this.props.trips.filter(trip => trip.id === tripId)[0];
    this.props.onTripSelected(trip);
  }

  onAddTripPressed() {
    this.props.onTripAdd();
  }

  _loadTrips() {
    this.props.onTripsLoad();
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
              <Money style={styles.cost} amount={rowData.total_cost} />
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
    const {
      isFetchingTrips,
      fetchTripsErrorMessage,
      dataSource,
      isViewingNewTripForm,
      emptyMessageVisible
    } = this.props;

    return (
      <View style={styles.container}>
        <AsyncIndicator
          style={styles.spinner}
          active={isFetchingTrips}
          errorMessage={fetchTripsErrorMessage}
          onRetryPress={this._loadTrips.bind(this)}/>
        <EmptyMessage text="You haven't taken any trips yet. What are you waiting for?" hidden={!emptyMessageVisible} />
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
        <FloatingButton icon="plus-circle" size={50} onButtonPressed={this.onAddTripPressed.bind(this)} />
        <Modal animationType={'slide'} transparent={false} visible={isViewingNewTripForm}>
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
