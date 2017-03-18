import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Modal,
  AppRegistry
} from 'react-native';

import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import OpenDrawerButton from './../containers/OpenDrawerButton';
import EditUserButton from './../containers/EditUserButton';

import { Header } from 'react-navigation';


let styles = StyleSheet.create({
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
  userHeader: {
    flexDirection: 'row'
  },
  userHeaderRightColumn: {
    flex: 1
  },
  userStats: {
    flex: 1,
    flexDirection: 'row'
  },
  userStat: {
    flex: 3,
    alignItems: 'center',
  },
  userStatValue: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  userStatLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8d8d8d'
  },
  userName: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  userEmail: {
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 3,
    color: '#3d3d3d'
  }
});

class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
    header: () => ({
      left: (
        <OpenDrawerButton />
      ),
      right: (
        <EditUserButton />
      )
    })
  };

  updateUserImage(image) {
    this.props.onUserImageChanged(this.props.user, image);
  }

  render() {
    let { user } = this.props;

    return (
      <View>
        <View style={styles.containerHeader}>
          <View style={styles.userHeader}>
            <HeaderImage
              image={user.picture}
              title={'User'}
              size={100}
              onImageSelected={this.updateUserImage.bind(this)}
              icon="car"
              isUploadingImage={this.props.isUploadingUserImage} />
            <View style={styles.userHeaderRightColumn}>
              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatValue}>{user.total_trips}</Text>
                  <Text style={styles.userStatLabel}>Trips</Text>
                </View>
                <View style={styles.userStat}>
                  <Money style={styles.userStatValue} amount={user.total_purchased} />
                  <Text style={styles.userStatLabel}>Purchases</Text>
                </View>
                <View style={styles.userStat}>
                  <Money style={styles.userStatValue} amount={user.total_paid} />
                  <Text style={styles.userStatLabel}>Paid</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{this.props.user.name}</Text>
            <Text style={styles.userEmail}>{this.props.user.email}</Text>
          </View>
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

AppRegistry.registerComponent('Profile', () => Profile);

export default Profile;
