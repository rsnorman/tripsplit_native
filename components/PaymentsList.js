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
  paymentUser: {
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
  paymentObligation: {
    flexDirection: 'row'
  },
  runningTotal: {
    marginTop: 3,
    flexDirection: 'column',
    opacity: 0.5
  },
  runningTotalAmount: {
    textAlign: 'center',
    color: '#5e5e5e'
  },
  runningTotalLabel: {
    textAlign: 'center',
    color: '#5e5e5e'
  }
});

class PaymentsList extends Component {
  _loadPayments() {
    this.props.onPaymentsLoad(this.props.trip, this.props.member);
  }

  componentDidMount() {
    this._loadPayments();
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <ListImage size={80} image={rowData.picture} icon={rowData.expense_type} />
          <View style={styles.textContainer}>
            <Text style={styles.name} numberOfLines={1}>
              {rowData.name}
            </Text>
            <Text style={styles.paymentUser} numberOfLines={1}>
              {rowData.recipient.name}
            </Text>
            <View style={styles.paymentObligation} >
              <Money style={styles.cost} amount={rowData.amount} />
              <Text> / </Text>
              <Money style={styles.cost} amount={rowData.total} />
            </View>
          </View>
          <View style={styles.runningTotal}>
            <Money style={styles.runningTotalAmount} amount={rowData.running_total} />
            <Text style={styles.runningTotalLabel}>Total</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  render() {
    const { isFetchingMemberPayments, fetchPaymentsErrorMessage, dataSource } = this.props;

    return (
      <View style={styles.container}>
        <AsyncIndicator
          style={styles.spinner}
          active={isFetchingMemberPayments}
          errorMessage={fetchPaymentsErrorMessage}
          onRetryPress={this._loadPayments.bind(this)}/>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('PaymentsList', () => PaymentsList);

export default PaymentsList;
