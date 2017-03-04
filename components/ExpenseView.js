import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicator,
  Modal,
  Button,
  AppRegistry
} from 'react-native';

var ImagePicker = require('react-native-image-picker');

import Icon from 'react-native-vector-icons/FontAwesome';

import EditExpense from './../containers/EditExpense'
import EditExpenseButton from './../containers/EditExpenseButton'
import ExpenseObligations from './../containers/ExpenseObligations'

let styles = StyleSheet.create({
  container: {
  },
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
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 4,
    backgroundColor: '#48bbec'
  },
  thumbIcon: {
    padding: 12
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
  },
  editIcon: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    backgroundColor: 'transparent'
  },
  imageUploadSpinner: {
    position: 'absolute',
    left: 25,
    top: 20
  },
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

  onImageEditPressed() {
    // More info on all the options is below in the README...just some common use cases shown here
    let options = {
      title: 'Select Expense Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.didCancel) {
        console.log('ImagePicker Canceled');
      } else {
        this.props.onExpenseImageChanged(this.props.session, this.props.expense, { uri: response.uri, fileName: response.fileName});
      }
    });
  }

  render() {
    let expense = this.props.expense;
    let spinner = this.props.isFetchingObligations ?
      <ExpenseObligations /> :
      <View />;
    let picture = expense.picture.url ?
      ( <Image source={{uri: 'http://localhost:3000' + expense.picture.thumb.url}} style={styles.thumb} /> ) :
      ( <Icon name={expense.expense_type} style={styles.thumbIcon} size={50} color="#fff" /> );
    let pictureSpinner = this.props.isUploadingExpenseImage ?
      ( <ActivityIndicator style={styles.imageUploadSpinner} size="large" /> ) :
      ( <View /> );

    return (
      <View style={styles.container}>
        <View style={styles.containerHeader}>
          <View style={styles.expenseHeader}>
            <TouchableHighlight
              onPress={() => this.onImageEditPressed()}
              underlayColor='#dddddd'>
              <View style={styles.thumb}>
                {picture}
                <Icon name="edit" style={styles.editIcon} size={15} color="#fff" />
                {pictureSpinner}
              </View>
            </TouchableHighlight>
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
