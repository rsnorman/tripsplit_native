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
import ModalFormHeader from './ModalFormHeader';
import DeleteButton from './DeleteButton';

import formStyles from '../styles/form';
import { primaryColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
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
      title,
      isSavingUser,
      saveButtonDisabled,
      deleteButtonDisabled,
      errorMessage
    } = this.props;

    return (
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
          <DeleteButton
            disabled={deleteButtonDisabled}
            onPress={this.onDeletePressed.bind(this)} />
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
