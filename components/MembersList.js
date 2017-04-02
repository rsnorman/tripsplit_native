import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  ListView,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ListImage from './../components/ListImage';
import Money from './../components/MoneyView';
import AsyncIndicator from './../components/AsyncIndicator';

let styles = StyleSheet.create({
  spinner: {
    marginTop: 20
  },
  container: {
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
  name: {
    fontSize: 18
  },
  purchaser: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  cost: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});

class MembersList extends Component {
  _loadMembers() {
    this.props.onMembersLoad(this.props.trip)
  }

  componentDidMount() {
    this._loadMembers();
  }

  rowPressed(memberId) {
    let member = this.props.members.filter(member => member.id === memberId)[0];
    this.props.onMemberSelected(member);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <ListImage size={80} image={rowData.picture} icon='user' />
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {rowData.name}
              </Text>
              <Text style={styles.cost}>
                Purchased: <Money amount={rowData.total_purchased_amount} />
              </Text>
              <Text style={styles.cost} numberOfLines={1}>
                Paid: <Money amount={rowData.total_contributed_amount} />
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { isFetchingTripMembers, fetchMembersErrorMessage, dataSource } = this.props;

    return (
      <View style={styles.container}>
        <AsyncIndicator
          style={styles.spinner}
          active={isFetchingTripMembers}
          errorMessage={fetchMembersErrorMessage}
          onRetryPress={this._loadMembers.bind(this)}/>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MembersList', () => MembersList);

export default MembersList;
