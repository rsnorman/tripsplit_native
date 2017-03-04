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
import NewExpense from './../containers/NewExpense'

let styles = StyleSheet.create({
  container: {
    height: ScreenHeight - 64
  },
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15
  },
  thumb: {
    width: 120,
    height: 120,
    borderRadius: 4,
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
    bottom: 2,
    backgroundColor: 'transparent'
  },
  imageUploadSpinner: {
    position: 'absolute',
    left: 25,
    top: 20
  },
  addExpenseButton: {
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

  onAddExpensePressed() {
    this.props.onAddExpensePressed(this.props.trip);
  }

  render() {
    let trip = this.props.trip;
    let spinner = this.props.isFetchingExpenses ?
      <TripExpenses />:
      <View />;
    let picture = trip.picture.url ?
      ( <Image source={{uri: 'http://localhost:3000' + trip.picture.thumb.url}} style={styles.thumb} /> ) :
      ( <Icon name="car" style={styles.thumbIcon} size={50} color="#fff" /> );
    let pictureSpinner = this.props.isUploadingTripImage ?
      ( <ActivityIndicator style={styles.imageUploadSpinner} size="large" /> ) :
      ( <View /> );

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.tripHeader}>
            <TouchableHighlight
              onPress={() => this.onImageEditPressed()}
              underlayColor='#dddddd'>
              <View style={styles.thumb}>
                {picture}
                <Icon name="edit" style={styles.editIcon} size={15} color="#fff" />
                {pictureSpinner}
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
        <TouchableHighlight
          style={styles.addExpenseButton}
          onPress={this.onAddExpensePressed.bind(this)}
          underlayColor="#54CBFD">
          <Icon name="money" style={styles.addIcon} />
        </TouchableHighlight>
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingEditTripForm}>
          <EditTrip />
        </Modal>
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingNewExpenseForm}>
          <NewExpense />
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
