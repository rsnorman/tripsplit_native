import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  Modal,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import OpenDrawerButton from './../containers/OpenDrawerButton';
import EditUserButton from './../containers/EditUserButton';
import EditUser from './../containers/EditUser';
import ChangeUserPassword from './../containers/ChangeUserPassword';
import { primaryColor, borderColor } from './../constants';

import { Header } from 'react-navigation';
let renderCount = 0;

let styles = StyleSheet.create({
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
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
  },
  changePasswordButtonText: {
    color: primaryColor,
    fontWeight: 'normal',
    fontSize: 14
  }
});

class Profile extends Component {
  componentDidMount() {
    this.props.onUserProfileLoad(this.props.user);
  }

  updateUserImage(image) {
    this.props.onUserImageChanged(this.props.user, image);
  }

  changePassword() {
    this.props.onUserEditPassword(this.props.user);
  }

  render() {
    const {
      user,
      isUploadingUserImage,
      uploadPhotoErrorMessage,
      isViewingEditUserForm,
      isViewingChangeUserPasswordForm,
      onEditUserModalRequestClose,
      onEditUserPasswordModalRequestClose
    } = this.props;

    return (
      <View>
        <Header
          scene={{index: 0}}
          navigation={{state: {index: 0}}}
          getScreenDetails={() => {
            return {
              options: {
                title: 'Profile',
                headerLeft: <OpenDrawerButton />,
                headerRight: <EditUserButton />,
                headerTintColor: primaryColor,
                headerTitleStyle: { color: 'black' },
                headerStyle: {
                  backgroundColor: 'white'
                }
              }
            };
          }} />
        <View style={styles.containerHeader}>
          <View style={styles.userHeader}>
            <HeaderImage
              image={user.picture}
              title={'User'}
              size={100}
              onImageSelected={this.updateUserImage.bind(this)}
              icon="user"
              isUploadingImage={isUploadingUserImage}
              errorMessage={uploadPhotoErrorMessage}
              canEdit={true} />
            <View style={styles.userHeaderRightColumn}>
              <View style={styles.userStats}>
                <View style={styles.userStat}>
                  <Text style={styles.userStatValue}>{user.total_trips}</Text>
                  <Text style={styles.userStatLabel}>Trips</Text>
                </View>
                <View style={styles.userStat}>
                  <Money style={styles.userStatValue} amount={user.total_purchased} round={true} />
                  <Text style={styles.userStatLabel}>Purchases</Text>
                </View>
                <View style={styles.userStat}>
                  <Money style={styles.userStatValue} amount={user.total_paid} round={true} />
                  <Text style={styles.userStatLabel}>Paid</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <TouchableHighlight
              style={styles.changePasswordButton}
              underlayColor='transparent'
              onPress={this.changePassword.bind(this)}>
              <Text style={styles.changePasswordButtonText}>Change Password</Text>
            </TouchableHighlight>
          </View>
        </View>
        <Modal
          animationType={'slide'}
          transparent={false}
          onRequestClose={onEditUserModalRequestClose}
          visible={isViewingEditUserForm}>
          <EditUser />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={false}
          onRequestClose={onEditUserPasswordModalRequestClose}
          visible={isViewingChangeUserPasswordForm}>
          <ChangeUserPassword />
        </Modal>
      </View>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

AppRegistry.registerComponent('Profile', () => Profile);

export default Profile;
