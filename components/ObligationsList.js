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
import { primaryColor, grayColor, backgroundColor, lightGrayColor } from './../constants';

let styles = StyleSheet.create({
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
    fontSize: 13,
    color: primaryColor
  },
  unpaidIndicatorLabel: {
    fontSize: 13,
    color: grayColor
  },
  rowText: {
    backgroundColor: backgroundColor
  },
  nextScreenIndicator: {
    color: lightGrayColor,
    position: 'absolute',
    right: 10,
    top: 40
  },
  annulledObligation: {
    opacity: 0.4
  }
});

class ObligationsList extends Component {
  _loadObligations() {
    this.props.onObligationsLoad(this.props.expense);
  }

  componentDidMount() {
    this._loadObligations();
  }

  rowPressed(obligationId) {
    let obligation = this.props.obligations.filter(obligation => obligation.id === obligationId)[0];
    this.props.onObligationSelected(obligation);
  }

  renderRow(rowData, sectionID, rowID) {
    const paidIndicator = rowData.is_paid ?
      (
        <View style={styles.paidIndicator}>
          <Text style={[styles.paidIndicatorLabel, styles.rowText]}>{rowData.label}</Text>
        </View>
      ) :
      (
        <View style={styles.paidIndicator}>
          <Text style={[styles.unpaidIndicatorLabel, styles.rowText]}>{rowData.label}</Text>
        </View>
      );

    const rowStyle = rowData.is_annulled ? [styles.annulledObligation, styles.rowContainer] : [styles.rowContainer];

    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={rowStyle}>
            <ListImage size={50} image={rowData.user.picture} icon="user-circle" />
            <View style={styles.textContainer}>
              <Text style={[styles.obligator, styles.rowText]} numberOfLines={1}>
                {rowData.user.name || rowData.user.email}
              </Text>
              <Money style={[styles.amount, styles.rowText]} amount={rowData.amount} />
            </View>
            {paidIndicator}
          </View>
          <Icon name="arrow-right" style={styles.nextScreenIndicator} />
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {
      isFetchingExpenseObligations,
      fetchObligationsErrorMessage,
      dataSource
    } = this.props;

    return (
      <View>
        <AsyncIndicator
          active={isFetchingExpenseObligations}
          errorMessage={fetchObligationsErrorMessage}
          onRetryPress={this._loadObligations.bind(this)}/>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('ObligationsList', () => ObligationsList);

export default ObligationsList;
