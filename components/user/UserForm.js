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
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';
import DeleteButton from './DeleteButton';

import formStyles from '../styles/form';
import { primaryColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
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
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
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

class UserForm extends Component {
  onNameChanged(event) {
    this.props.onUserAttributeSet('name', event.nativeEvent.text);
  }
  onEmailChanged(event) {
    this.props.onUserAttributeSet('email', event.nativeEvent.text);
  }

  onSavePressed() {
    this.props.onSave(this.props.user);
  }

  onDeletePressed() {
    this.popup.confirm({
      title: 'Delete Your Account',
      content: ['Are you sure you want to delete your account?'],
      ok: {
        text: 'Yes',
        style: {
            color: 'red'
        },
        callback: () => {
            this.props.onDelete(this.props.user);
        },
      },
      cancel: {
        text: 'Cancel'
      },
    });
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  render() {
    const {
      user,
      isSavingUser,
      saveButtonDisabled,
      deleteButtonDisabled,
      errorMessage
    } = this.props;

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
              value={user.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={user.email}
              style={styles.input}
              onChange={this.onEmailChanged.bind(this)}
              placeholder='Email'/>
          </View>
          <FormButton
            onPress={this.onSavePressed.bind(this)}
            disabled={saveButtonDisabled}
            text="Save" />
          <DeleteButton
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
            active={isSavingUser}
            errorMessage={errorMessage} />
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }
}

AppRegistry.registerComponent('UserForm', () => UserForm);

export default UserForm;
