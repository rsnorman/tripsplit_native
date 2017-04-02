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

class ExpensesList extends Component {
  _loadExpenses() {
    this.props.onExpensesLoad(this.props.trip);
  }

  componentDidMount() {
    this._loadExpenses();
  }

  rowPressed(expenseId) {
    let expense = this.props.expenses.filter(expense => expense.id === expenseId)[0];
    this.props.onExpenseSelected(expense)
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <ListImage size={80} image={rowData.picture} icon={rowData.expense_type} />
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {rowData.name}
              </Text>
              <Text style={styles.purchaser} numberOfLines={1}>
                Purchaser: {rowData.purchaser.name || rowData.purchaser.email}
              </Text>
              <Money style={styles.cost} amount={rowData.cost} />
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { isFetchingTripExpenses, fetchExpensesErrorMessage, dataSource } = this.props;

    return (
      <View style={styles.container}>
        <AsyncIndicator
          style={styles.spinner}
          active={isFetchingTripExpenses}
          errorMessage={fetchExpensesErrorMessage}
          onRetryPress={this._loadExpenses.bind(this)}/>
        <ListView
          dataSource={dataSource}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
      </View>
    );
  }
}

AppRegistry.registerComponent('ExpensesList', () => ExpensesList);

export default ExpensesList;
