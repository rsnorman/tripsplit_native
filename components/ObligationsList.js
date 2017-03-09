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
import Money from './../components/MoneyView';

let styles = StyleSheet.create({
  loader: {
    marginTop: 20
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  obligator: {
    fontSize: 18
  },
  amount: {
    fontSize: 16,
    color: '#5e5e5e'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  paidIndicator: { },
  paidIndicatorLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#48bbec'
  }
});

class ObligationsList extends Component {
  componentDidMount() {
    this.props.onObligationsLoad(this.props.expense)
  }

  rowPressed(obligationId) {
    let obligation = this.props.obligations.filter(obligation => obligation.id === obligationId)[0];
    this.props.onObligationSelected(obligation);
  }

  renderRow(rowData, sectionID, rowID) {
    let paidIndicator = rowData.is_paid ?
      (
        <View style={styles.paidIndicator}>
          <Text style={styles.paidIndicatorLabel}>Paid</Text>
        </View>
      ) :
      ( <View /> );

    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <ListImage size={50} image={rowData.user.picture} icon="user-circle" />
            <View style={styles.textContainer}>
              <Text style={styles.obligator} numberOfLines={1}>
                {rowData.user.name || rowData.user.email}
              </Text>
              <Money style={styles.amount} amount={rowData.amount} />
            </View>
            {paidIndicator}
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isFetchingExpenseObligations) {
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

AppRegistry.registerComponent('ObligationsList', () => ObligationsList);

export default ObligationsList;
