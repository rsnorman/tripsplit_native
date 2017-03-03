import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  ListView,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

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

class ExpensesList extends Component {
  componentDidMount() {
    this.props.onExpensesLoad(this.props.session, this.props.trip)
  }

  rowPressed(expenseId) {
    console.log('Show expense', expenseId);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.thumb}>
              <Icon name={rowData.expense_type} style={styles.thumbIcon} size={50} color="#fff" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {rowData.name}
              </Text>
              <Text style={styles.purchaser} numberOfLines={1}>
                Purchaser: {rowData.purchaser.name || rowData.purchaser.email}
              </Text>
              <Text style={styles.cost} numberOfLines={1}>
                ${rowData.cost}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isFetchingTripExpenses) {
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

AppRegistry.registerComponent('ExpensesList', () => ExpensesList);

export default ExpensesList;
