import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Text,
  ActivityIndicator,
  Modal,
  Button,
  AppRegistry
} from 'react-native';


import EditExpense from './../containers/EditExpense'
import EditExpenseButton from './../containers/EditExpenseButton'
import ExpenseObligations from './../containers/ExpenseObligations'
import HeaderImage from './../components/HeaderImage';

let styles = StyleSheet.create({
  containerHeader: {
    alignSelf: 'stretch',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15
  },
  loader: {
    marginTop: 30
  },
  expenseHeader: {
    flexDirection: 'row'
  },
  expenseHeaderRightColumn: {
    flex: 1
  },
  expenseCostDetails: {
    flex: 1,
    flexDirection: 'row'
  },
  purchaser: {
    flex: 1,
    alignItems: 'center'
  },
  purchaserLabel: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8d8d8d'
  },
  expenseDetail: {
    flex: 2,
    alignItems: 'center',
  },
  expenseDetailValue: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  expenseDetailLabel: {
    textAlign: 'center',
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8d8d8d'
  },
  expenseName: {
    fontWeight: 'bold',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
  },
  expenseDescription: {
    fontStyle: 'italic',
    color: '#3d3d3d'
  }
});

class ExpenseView extends Component {
  static navigationOptions = {
    title: (navigation) => {
      return navigation.state.params.expense.name ;
    },
    header: ({ state, setParams }) => ({
      right: (
        <EditExpenseButton />
      )
    })
  };

  updateExpenseImage(image) {
    this.props.onExpenseImageChanged(
      this.props.session,
      this.props.expense,
      image
    );
  }

  render() {
    let expense = this.props.expense;
    let spinner = this.props.isFetchingObligations ?
      <ExpenseObligations /> :
      <View />;

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.expenseHeader}>
            <HeaderImage
              image={this.props.expense.picture}
              title="Expense"
              size={100}
              onImageSelected={this.updateExpenseImage.bind(this)}
              icon={this.props.expense.expense_type}
              isUploadingImage={this.props.isUploadingExpenseImage} />
            <View style={styles.expenseHeaderRightColumn}>
              <View style={styles.expenseCostDetails}>
                <View style={styles.expenseDetail}>
                  <Text style={styles.expenseDetailValue}>${expense.cost}</Text>
                  <Text style={styles.expenseDetailLabel}>Cost</Text>
                </View>
                <View style={styles.expenseDetail}>
                  <Text style={styles.expenseDetailValue}>${expense.average_cost}</Text>
                  <Text style={styles.expenseDetailLabel}>Average Cost</Text>
                </View>
              </View>
              <View style={styles.purchaser}>
                <Text style={styles.purchaserLabel}>Purchased by: {expense.purchaser.name || expense.purchaser.email}</Text>
              </View>
            </View>
          </View>
          <View style={styles.expenseDetails}>
            <Text style={styles.expenseName}>{this.props.expense.name}</Text>
            <Text style={styles.expenseDescription}>{this.props.expense.description}</Text>
          </View>
        </View>
        {spinner}
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingEditExpenseForm}>
          <EditExpense />
        </Modal>
      </View>
    );
  }
}

ExpenseView.propTypes = {
  expense: PropTypes.object.isRequired
};

AppRegistry.registerComponent('ExpenseView', () => ExpenseView);

export default ExpenseView;
