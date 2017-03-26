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

import EditTrip from './../containers/EditTrip';
import EditTripButton from './../containers/EditTripButton';
import TripExpenses from './../containers/TripExpenses';
import TripMembers from './../containers/TripMembers';
import NewExpense from './../containers/NewExpense';
import FloatingButton from './../components/FloatingButton';
import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import ActiveTripTabNavigator from './../containers/ActiveTripTabNavigator';


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
    paddingBottom: 3,
    marginBottom: 3
  },
  tripDescription: {
    fontStyle: 'italic',
    color: '#3d3d3d'
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

  componentDidMount() {
    if (this.props.needsTripReload) {
      this.props.onDirtyTripLoad(this.props.trip);
    }
  }

  updateTripImage(image) {
    this.props.onTripImageChanged(this.props.trip, image);
  }

  onAddExpensePressed() {
    this.props.onAddExpensePressed(this.props.trip);
  }

  renderRow(rowData, sectionID, rowID) {
    switch(rowData) {
      case 'TRIP_HEADER':
        let trip = this.props.trip;
        return (
          <View style={styles.containerHeader}>
            <View style={styles.tripHeader}>
              <HeaderImage
                image={this.props.trip.picture}
                title={'Trip'}
                size={100}
                onImageSelected={this.updateTripImage.bind(this)}
                icon="car"
                isUploadingImage={this.props.isUploadingTripImage}
                canEdit={!!this.props.canEditPhoto} />
              <View style={styles.tripHeaderRightColumn}>
                <View style={styles.tripStats}>
                  <View style={styles.tripStat}>
                    <Text style={styles.tripStatValue}>{trip.total_members}</Text>
                    <Text style={styles.tripStatLabel}>Members</Text>
                  </View>
                  <View style={styles.tripStat}>
                    <Money style={styles.tripStatValue} amount={trip.total_cost} />
                    <Text style={styles.tripStatLabel}>Cost</Text>
                  </View>
                  <View style={styles.tripStat}>
                    <Money style={styles.tripStatValue} amount={trip.average_cost_per_member} />
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
        );
      case 'TRIP_TABS':
        return <ActiveTripTabNavigator />
      case 'TRIP_EXPENSES':
        return <TripExpenses />
      case 'TRIP_MEMBERS':
        return <TripMembers />
      default:
        throw('Unknown row type');
    }
  }

  render() {
    if (this.props.isFetchingTripExpenses) {
      return (
        <ActivityIndicator style={styles.loader} size='large'/>
      );
    }

    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const tripItems = ['TRIP_EXPENSES', 'TRIP_MEMBERS'];
    const tripRows = ['TRIP_HEADER', 'TRIP_TABS', tripItems[this.props.activeTabIndex]];

    let addExpenseButton = this.props.showAddExpenseButton ?
      ( <FloatingButton icon="dollar" size={50} onButtonPressed={this.onAddExpensePressed.bind(this)} /> ) :
      ( <View /> );

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource.cloneWithRows(tripRows)}
          enableEmptySections={true}
          stickyHeaderIndices={[1]}
          renderRow={this.renderRow.bind(this)}/>
        {addExpenseButton}
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
