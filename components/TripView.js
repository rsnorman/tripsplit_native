import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicator,
  Modal,
  Button,
  Share,
  Platform,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import EditTrip from './../containers/EditTrip';
import EditTripButton from './../containers/EditTripButton';
import TripExpenses from './../containers/TripExpenses';
import TripMembers from './../containers/TripMembers';
import NewExpenseStackNavigator from './../containers/NewExpenseStackNavigator';
import NewMember from './../containers/NewMember';
import FloatingButton from './../components/FloatingButton';
import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import ActiveTripTabNavigator from './../containers/ActiveTripTabNavigator';
import { primaryColor, backgroundColor } from './../constants';

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    backgroundColor
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
  },
  shareButton: {
    marginTop: 2,
    backgroundColor
  },
  shareText: {
    textAlign: 'center',
    fontSize: 14,
    color: primaryColor
  }
});

class TripView extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.trip.name,
    headerTintColor: primaryColor,
    headerTitleStyle: { color: 'black' },
    headerRight: <EditTripButton />
  });

  componentDidMount() {
    if (this.props.needsTripReload) {
      this.props.onDirtyTripLoad(this.props.trip);
    }
  }

  openShare() {
    let shareAttrs = {
      message: `Join ${this.props.trip.name} to help manage trip expenses!`,
      title: this.props.trip.name
    };

    if (Platform.OS === 'ios') {
      shareAttrs['url'] = this.props.trip.join_trip_url;
    } else {
      shareAttrs['message'] = `${shareAttrs['message']} ${this.props.trip.join_trip_url}`;
    }

    Share.share(shareAttrs, {
      dialogTitle: `Join ${this.props.trip.name}`,
      tintColor: primaryColor
    });
  }

  updateTripImage(image) {
    this.props.onTripImageChanged(this.props.trip, image);
  }

  onAddExpensePressed() {
    this.props.onAddExpensePressed(this.props.trip);
  }

  onAddMemberPressed() {
    this.props.onAddMemberPressed(this.props.trip);
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
                canEdit={this.props.canEditPhoto}
                errorMessage={this.props.uploadPhotoErrorMessage} />
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
                  <Text style={styles.organizerLabel}>Organized by {trip.organizer.name}</Text>
                </View>
                <TouchableHighlight style={styles.shareButton} onPress={this.openShare.bind(this)} underlayColor="transparent">
                  <View>
                    <Icon style={styles.shareText} name="share" />
                    <Text style={styles.shareText}>Invite</Text>
                  </View>
                </TouchableHighlight>
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
    const {
      onEditTripModalRequestClose,
      onNewExpenseModalRequestClose,
      onNewMemberModalRequestClose
    } = this.props;

    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const tripItems = ['TRIP_EXPENSES', 'TRIP_MEMBERS'];
    const tripRows = ['TRIP_HEADER', 'TRIP_TABS', tripItems[this.props.activeTabIndex]];

    let addExpenseButton = this.props.showAddExpenseButton ?
      ( <FloatingButton icon="dollar" size={50} onButtonPressed={this.onAddExpensePressed.bind(this)} /> ) :
      ( <View /> );

    let addMemberButton = this.props.showAddMembersButton ?
      ( <FloatingButton icon="user-plus" size={50} onButtonPressed={this.onAddMemberPressed.bind(this)} /> ) :
      ( <View /> );

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource.cloneWithRows(tripRows)}
          enableEmptySections={true}
          stickyHeaderIndices={Platform.OS === 'ios' ? [1] : []}
          renderRow={this.renderRow.bind(this)}/>
        {addExpenseButton}
        {addMemberButton}
        <Modal
          animationType={'slide'}
          transparent={false}
          onRequestClose={onEditTripModalRequestClose}
          visible={this.props.isViewingEditTripForm}>
          <EditTrip />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          onRequestClose={onNewExpenseModalRequestClose}
          visible={this.props.isViewingNewExpenseForm}>
          <NewExpenseStackNavigator />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          onRequestClose={onNewMemberModalRequestClose}
          visible={this.props.isViewingNewMemberForm}>
          <NewMember />
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
