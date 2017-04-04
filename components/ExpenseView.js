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
import Money from './../components/MoneyView';
import { primaryColor } from './../constants';

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
    this.props.onExpenseImageChanged(this.props.expense, image);
  }

  renderRow(rowData, sectionID, rowID) {
    let { expense, isFetchingObligations } = this.props;

    switch(rowData) {
      case 'EXPENSE_HEADER':
        return (
          <View style={styles.containerHeader}>
            <View style={styles.expenseHeader}>
              <HeaderImage
                image={expense.picture}
                title="Expense"
                size={100}
                onImageSelected={this.updateExpenseImage.bind(this)}
                icon={expense.expense_type}
                isUploadingImage={this.props.isUploadingExpenseImage}
                canEdit={this.props.canEditPhoto}
                errorMessage={this.props.uploadPhotoErrorMessage}  />
              <View style={styles.expenseHeaderRightColumn}>
                <View style={styles.expenseCostDetails}>
                  <View style={styles.expenseDetail}>
                    <Money style={styles.expenseDetailValue} amount={expense.cost} />
                    <Text style={styles.expenseDetailLabel}>Cost</Text>
                  </View>
                  <View style={styles.expenseDetail}>
                    <Money style={styles.expenseDetailValue} amount={expense.average_cost} />
                    <Text style={styles.expenseDetailLabel}>Average Cost</Text>
                  </View>
                </View>
                <View style={styles.purchaser}>
                  <Text style={styles.purchaserLabel}>Purchased by: {expense.purchaser.name || expense.purchaser.email}</Text>
                </View>
              </View>
            </View>
            <View style={styles.expenseDetails}>
              <Text style={styles.expenseName}>{expense.name}</Text>
              <Text style={styles.expenseDescription}>{expense.description}</Text>
            </View>
          </View>
        );
      case 'EXPENSE_OBLIGATIONS':
        let obligationsView = isFetchingObligations ?
          <ExpenseObligations /> :
          <View />;
        return obligationsView;
      default:
        throw('Unknown row type');
    }
  }

  render() {
    const dataSource = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
    });

    const expenseRows = ['EXPENSE_HEADER', 'EXPENSE_OBLIGATIONS'];

    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource.cloneWithRows(expenseRows)}
          enableEmptySections={true}
          renderRow={this.renderRow.bind(this)}/>
        <Modal animationType={'slide'} transparent={false} visible={this.props.isViewingEditExpenseForm}>
          <EditExpense />
        </Modal>
      </View>
    );
  }
}

ExpenseView.propTypes = {
  expense: PropTypes.object.isRequired,
  isFetchingObligations: PropTypes.bool.isRequired,
  isViewingEditExpenseForm: PropTypes.bool.isRequired
};

AppRegistry.registerComponent('ExpenseView', () => ExpenseView);

export default ExpenseView;
