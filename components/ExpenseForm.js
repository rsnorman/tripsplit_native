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

import Popup from 'react-native-popup';

var styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  formHeader: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: 40
  },
  formHeaderText: {
    textAlign: 'center',
    color: '#48bbec',
    fontWeight: 'bold',
    fontSize: 22
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 30,
    marginTop: 60
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 15
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  deleteButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  deleteButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#48bbec',
    alignSelf: 'center'
  },
  cancelButton: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    borderColor: '#48bbec',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  input: {
    height: 36,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 8,
    color: '#48bbec'
  },
  multiLineInput: {
    height: 108,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 8,
    color: '#48bbec'
  },
  spinner: {
    marginTop: 15
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
    let spinner = this.props.isSavingExpense || this.props.isDeletingExpense ?
      ( <ActivityIndicator size='large' style={styles.spinner} /> ) :
      ( <View/> );

    let deleteButton = this.props.showDeleteButton ?
      ( <View style={styles.formRow}>
        <TouchableHighlight style={styles.deleteButton}
          onPress={this.onDeletePressed.bind(this)}
          underlayColor='#bb0000'>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableHighlight>
      </View> ) :
      ( <View /> );

    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.expense.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.expense.cost}
              style={styles.input}
              onChange={this.onCostChanged.bind(this)}
              placeholder='Cost'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.expense.description}
              style={styles.multiLineInput}
              onChange={this.onDescriptionChanged.bind(this)}
              multiline={true}
              numberOfLines={3}
              placeholder='Description'/>
          </View>
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.button}
              onPress={this.onSavePressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
          </View>
          {deleteButton}
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          {spinner}
          <Text style={styles.description}>{this.props.message}</Text>
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }
}

AppRegistry.registerComponent('ExpenseForm', () => ExpenseForm);

export default ExpenseForm;
