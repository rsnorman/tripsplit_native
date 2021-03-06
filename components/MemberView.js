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
  AppRegistry
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

import Icon from 'react-native-vector-icons/FontAwesome';

import MemberPayments from './../containers/MemberPayments';
import RemoveMemberButton from './../containers/RemoveMemberButton';
import HeaderImage from './../components/HeaderImage';
import Money from './../components/MoneyView';
import OweAmount from './../components/OweAmount';
import ConfirmPopup from '../containers/ConfirmPopup';
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
  memberHeader: {
    flexDirection: 'row'
  },
  memberHeaderRightColumn: {
    flex: 1
  },
  memberStats: {
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
  memberStat: {
    flex: 3,
    alignItems: 'center',
  },
  memberStatValue: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  memberStatLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8d8d8d'
  },
  memberName: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  memberEmail: {
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 3,
    color: '#3d3d3d'
  }
});

class MemberView extends Component {
  static navigationOptions = {
    title: (navigation) => {
      const { name } = navigation.state.params.member;
      return name[name.length - 1] === 's' ? `${name}' Activity` : `${name}'s Activity`;
    },
    header: {
      right: (
        <RemoveMemberButton />
      ),
      tintColor: primaryColor,
      titleStyle: { color: 'black' }
    }
  };

  static navigationOptions = ({navigation}) => {
    const { name } = navigation.state.params.member;
    const title = name[name.length - 1] === 's' ? `${name}' Activity` : `${name}'s Activity`;

    return {
      title,
      headerTintColor: primaryColor,
      headerTitleStyle: { color: 'black' },
      headerRight: <RemoveMemberButton />
    }
  };

  updateMemberImage(image) {
    this.props.onMemberImageChanged(this.props.member, image);
  }

  renderRow(rowData, sectionID, rowID) {
    switch(rowData) {
      case 'MEMBER_HEADER':
        let { member, isLoggedInUser } = this.props;

        let oweAmount = isLoggedInUser ?
          ( <View /> ) :
          ( <OweAmount amount={member.owes_current_user} /> );
        return (
          <View style={styles.containerHeader}>
            <View style={styles.memberHeader}>
              <HeaderImage
                image={member.picture}
                title="Member"
                size={100}
                onImageSelected={this.updateMemberImage.bind(this)}
                icon="user"
                isUploadingImage={this.props.isUploadingMemberImage}
                canEdit={this.props.canEditPhoto}
                errorMessage={this.props.uploadPhotoErrorMessage}  />
              <View style={styles.memberHeaderRightColumn}>
                <View style={styles.memberStats}>
                  <View style={styles.memberStat}>
                    <Money style={styles.memberStatValue} amount={member.total_purchased_amount} />
                    <Text style={styles.memberStatLabel}>Purchased</Text>
                  </View>
                  <View style={styles.memberStat}>
                    <Money style={styles.memberStatValue} amount={member.total_paid_back_amount} />
                    <Text style={styles.memberStatLabel}>Paid Back</Text>
                  </View>
                  <View style={styles.memberStat}>
                    <Money style={styles.memberStatValue} amount={member.total_contributed_amount} />
                    <Text style={styles.memberStatLabel}>Contributed</Text>
                  </View>
                </View>
                {oweAmount}
              </View>
            </View>
            <View style={styles.memberDetails}>
              <Text style={styles.memberName}>{this.props.member.name}</Text>
              <Text style={styles.memberEmail} selectable={true}>{this.props.member.email}</Text>
            </View>
          </View>
        );
      case 'MEMBER_PAYMENTS':
        return <MemberPayments />
      default:
        throw('Unknown row type');
    }
  }

  render() {
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const memberRows = ['MEMBER_HEADER', 'MEMBER_PAYMENTS'];

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource.cloneWithRows(memberRows)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
          <ConfirmPopup />
      </View>
    );
  }
}

MemberView.propTypes = {
  member: PropTypes.object.isRequired
};

AppRegistry.registerComponent('MemberView', () => MemberView);

export default MemberView;
