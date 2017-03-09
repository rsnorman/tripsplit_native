import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  ActivityIndicator,
  ListView,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ListImage from './../components/ListImage';

let styles = StyleSheet.create({
  loader: {
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
  componentDidMount() {
    this.props.onMembersLoad(this.props.trip)
  }

  rowPressed(memberId) {
    let member = this.props.members.filter(member => member.id === memberId)[0];
    // this.props.onMemberSelected(member);
  }

  renderRow(rowData, sectionID, rowID) {
    console.log(rowData);
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
              <Text style={styles.cost} numberOfLines={1}>
                Purchases: ${rowData.total_expense_amount}
              </Text>
              <Text style={styles.cost} numberOfLines={1}>
                Owes: ${rowData.total_owe_amount}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isFetchingTripMembers) {
      return (
        <ActivityIndicator style={styles.loader} size='large'/>
      );
    }

    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.props.dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('MembersList', () => MembersList);

export default MembersList;