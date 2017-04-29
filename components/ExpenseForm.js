import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import { primaryColor, dangerColor } from './../constants';

import Popup from 'react-native-popup';
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';
import DeleteButton from './DeleteButton';
import CurrencyTextInput from './CurrencyTextInput';
import KeyboardDismisser from './KeyboardDismisser';
import PurchaserPicker from './../containers/PurchaserPicker';
import ModalFormHeader from './ModalFormHeader';

import formStyles from '../styles/form';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
  }
});

class ExpenseForm extends Component {
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
            color: dangerColor
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
      <KeyboardDismisser>
        <View style={styles.container}>
          <ModalFormHeader
            title={title}
            submitText="Save"
            onSubmitPress={this.onSavePressed.bind(this)}
            submitButtonDisabled={saveButtonDisabled}
            onCancelPress={this.onCancelPressed.bind(this)} />
          <View style={styles.form}>
            <View style={styles.formRow}>
              <TextInput
                value={expense.name}
                style={styles.input}
                autoCapitalize="words"
                onChange={this.onNameChanged.bind(this)}
                placeholder='Name (e.g., Gas, Horse Masks)'/>
            </View>
            <View style={styles.formRow}>
              <CurrencyTextInput
                amount={expense.cost}
                style={styles.input}
                onChange={this.onCostChanged.bind(this)}
                placeholder="Cost" />
            </View>
            <PurchaserPicker selectedPurchaserId={expense.purchaser_id} onPurchaserSelected={this.onPurchaserChanged.bind(this)} />
            <View style={styles.formRow}>
              <TextInput
                value={expense.description}
                style={styles.multiLineInput}
                onChange={this.onDescriptionChanged.bind(this)}
                multiline={true}
                numberOfLines={3}
                autoCapitalize="sentences"
                placeholder='Description (optional)'/>
            </View>
            <DeleteButton
              hidden={!showDeleteButton}
              disabled={deleteButtonDisabled}
              onPress={this.onDeletePressed.bind(this)} />
            <AsyncIndicator
              active={isSavingExpense || isDeletingExpense}
              errorMessage={errorMessage} />
          </View>
          <Popup ref={popup => this.popup = popup }/>
        </View>
      </KeyboardDismisser>
    );
  }
}

AppRegistry.registerComponent('ExpenseForm', () => ExpenseForm);

export default ExpenseForm;
