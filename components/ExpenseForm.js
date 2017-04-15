import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  AppRegistry
} from 'react-native';

import { primaryColor } from './../constants';

import Popup from 'react-native-popup';
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';
import DeleteButton from './DeleteButton';
import PurchaserPicker from './../containers/PurchaserPicker';

import formStyles from '../styles/form';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
  },
  cancelButtonText: {
    fontSize: 18,
    color: primaryColor,
    alignSelf: 'center'
  },
  cancelButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

class ExpenseForm extends Component {
  static navigationOptions = {
    header: {
      style: {
        backgroundColor: '#E9E9EF',
        height: 100,
        borderBottomWidth: 0
      },
      titleStyle: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 22,
      },
      tintColor: primaryColor
    }
  };

  onNameChanged(event) {
    this.props.onExpenseAttributeSet('name', event.nativeEvent.text);
  }
  onCostChanged(event) {
    this.props.onExpenseAttributeSet('cost', event.nativeEvent.text);
  }
  onDescriptionChanged(event) {
    this.props.onExpenseAttributeSet('description', event.nativeEvent.text);
  }
  onPurchaserChanged(purchaserId) {
    this.props.onExpenseAttributeSet('purchaser_id', purchaserId);
  }

  onSavePressed() {
    this.props.onSave(this.props.expense);
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  onDeletePressed() {
    this.popup.confirm({
      title: 'Delete Expense',
      content: ['Are you sure you want to delete?'],
      ok: {
        text: 'Yes',
        style: {
            color: 'red'
        },
        callback: () => {
            this.props.onDelete(this.props.expense);
        },
      },
      cancel: {
        text: 'Cancel'
      },
    });

  }

  render() {
    const {
      expense,
      isSavingExpense,
      isDeletingExpense,
      showDeleteButton,
      title,
      errorMessage,
      saveButtonDisabled,
      deleteButtonDisabled
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              value={expense.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={expense.cost}
              style={styles.input}
              onChange={this.onCostChanged.bind(this)}
              placeholder='Cost'/>
          </View>
          <PurchaserPicker selectedPurchaserId={expense.purchaser_id} onPurchaserSelected={this.onPurchaserChanged.bind(this)} />
          <View style={styles.formRow}>
            <TextInput
              value={expense.description}
              style={styles.multiLineInput}
              onChange={this.onDescriptionChanged.bind(this)}
              multiline={true}
              numberOfLines={3}
              placeholder='Description'/>
          </View>
          <FormButton
            onPress={this.onSavePressed.bind(this)}
            text="Save"
            disabled={saveButtonDisabled} />
          <DeleteButton
            hidden={!showDeleteButton}
            disabled={deleteButtonDisabled}
            onPress={this.onDeletePressed.bind(this)} />
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='white'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <AsyncIndicator
            active={isSavingExpense || isDeletingExpense}
            errorMessage={errorMessage} />
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }
}

AppRegistry.registerComponent('ExpenseForm', () => ExpenseForm);

export default ExpenseForm;
