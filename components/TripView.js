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
  Button,
  AppRegistry
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

let ScreenHeight = Dimensions.get("window").height;

import Icon from 'react-native-vector-icons/FontAwesome';

import EditTrip from './../containers/EditTrip'
import EditTripButton from './../containers/EditTripButton'
import TripExpenses from './../containers/TripExpenses'

let styles = StyleSheet.create({
  container: {
  },
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15
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
  loader: {
    marginTop: 30
  },
  tripHeader: {
    flexDirection: 'row'
  },
  tripHeaderRightColumn: {
    flex: 1
  },
  tripStats: {
    flex: 1,
    flexDirection: 'row'
  },
  organizer: {
    flex: 1,
    alignItems: 'center'
  },
  organizerLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8d8d8d'
  },
  tripStat: {
    flex: 3,
    alignItems: 'center',
  },
  tripStatValue: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  tripStatLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8d8d8d'
  },
  tripName: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  tripLocation: {
    paddingTop: 3,
    paddingBottom: 3
  },
  tripDescription: {
    fontStyle: 'italic',
    color: '#3d3d3d'
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    bottom: 2
  }
});

class TripView extends Component {
  static navigationOptions = {
    title: (navigation) => {
      return navigation.state.params.trip.name ;
    },
    header: ({ state, setParams }) => ({
      right: (
        <EditTripButton />
      )
    })
  };

  onImageEditPressed() {
    // More info on all the options is below in the README...just some common use cases shown here
    let options = {
      title: 'Select Trip Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        this.props.onTripImageChanged(this.props.session, this.props.trip, { uri: response.uri, fileName: response.fileName});
      }
    });
  }

  render() {
    let trip = this.props.trip;
    let spinner = this.props.isFetchingExpenses ?
      <TripExpenses />:
      <View />;

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.tripHeader}>
            <TouchableHighlight
              onPress={() => this.onImageEditPressed()}
              underlayColor='#dddddd'>
              <View style={styles.thumb}>
                <Icon name="car" style={styles.thumbIcon} size={50} color="#fff" />
                <Icon name="edit" style={styles.editIcon} size={15} color="#fff" />
              </View>
            </TouchableHighlight>
            <View style={styles.tripHeaderRightColumn}>
              <View style={styles.tripStats}>
                <View style={styles.tripStat}>
                  <Text style={styles.tripStatValue}>{trip.total_members}</Text>
                  <Text style={styles.tripStatLabel}>Members</Text>
                </View>
                <View style={styles.tripStat}>
                  <Text style={styles.tripStatValue}>${trip.total_cost}</Text>
                  <Text style={styles.tripStatLabel}>Cost</Text>
                </View>
                <View style={styles.tripStat}>
                  <Text style={styles.tripStatValue}>${trip.average_cost_per_member}</Text>
                  <Text style={styles.tripStatLabel}>Average Cost</Text>
                </View>
              </View>
              <View style={styles.organizer}>
                <Text style={styles.organizerLabel}>Organized by: {trip.organizer.name || trip.organizer.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tripDetails}>
            <Text style={styles.tripName}>{this.props.trip.name}</Text>
            <Text style={styles.tripLocation}>{this.props.trip.location}</Text>
            <Text style={styles.tripDescription}>{this.props.trip.description}</Text>
          </View>
        </View>
        {spinner}
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingEditTripForm}>
          <EditTrip />
        </Modal>
      </View>
    );
  }
}

TripView.propTypes = {
  trip: PropTypes.object.isRequired
};

AppRegistry.registerComponent('TripView', () => TripView);

export default TripView;
