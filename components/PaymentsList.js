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
import EmptyMessage from './../components/EmptyMessageView';
import { primaryColor, backgroundColor } from './../constants';

let styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    backgroundColor: primaryColor
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
  },
  sectionHeader: {
    backgroundColor: '#EFEFF2',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd'
  },
  sectionText: {
    fontWeight: 'bold',
    color: 'darkgray'
  },
  rowText: {
  }
});

class PaymentsList extends Component {
  _loadPayments() {
    this.props.onPaymentsLoad(this.props.trip, this.props.member);
  }

  componentDidMount() {
    this._loadPayments();
  }

  renderSectionHeader(sectionData, sectionID) {
    if (sectionID === 's1') {
      return <View />
    }
    return (
      <View style={styles.sectionHeader}>
        <Text styles={styles.sectionLabel}>{sectionID}</Text>
      </View>
    );
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <ListImage size={80} image={rowData.picture} icon={rowData.expense_type} />
          <View style={styles.textContainer}>
            <Text style={[styles.name, styles.rowText]} numberOfLines={1}>
              {rowData.name}
            </Text>
            <Text style={[styles.paymentUser, styles.rowText]} numberOfLines={1}>
              {rowData.recipient.name}
            </Text>
            <View style={styles.paymentObligation} >
              <Money style={[styles.cost, styles.rowText]} amount={rowData.amount} />
              <Text style={styles.rowText}> / </Text>
              <Money style={[styles.cost, styles.rowText]} amount={rowData.total} />
            </View>
          </View>
          <View style={[styles.runningTotal, styles.rowText]}>
            <Money style={[styles.runningTotalAmount, styles.rowText]} amount={rowData.running_total} />
            <Text style={[styles.runningTotalLabel, styles.rowText]}>Total</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    );
  }

  render() {
    const {
      isFetchingMemberPayments,
      fetchPaymentsErrorMessage,
      dataSource,
      emptyMessageVisible,
      emptyMessage
    } = this.props;

    return (
      <View>
        <AsyncIndicator
          active={isFetchingMemberPayments}
          errorMessage={fetchPaymentsErrorMessage}
          onRetryPress={this._loadPayments.bind(this)}/>
        <EmptyMessage text={emptyMessage} hidden={!emptyMessageVisible} />
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('PaymentsList', () => PaymentsList);

export default PaymentsList;
