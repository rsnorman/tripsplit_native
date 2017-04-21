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
import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';

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

class UserPasswordForm extends Component {
  onCurrentPasswordChanged(event) {
    this.props.onPasswordAttributeSet('currentPassword', event.nativeEvent.text);
  }
  onPasswordChanged(event) {
    this.props.onPasswordAttributeSet('password', event.nativeEvent.text);
  }
  onPasswordConfirmationChanged(event) {
    this.props.onPasswordAttributeSet('passwordConfirmation', event.nativeEvent.text);
  }

  onSavePressed() {
    this.props.onSave(this.props.user, this.props.changedPasswordData);
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  render() {
    const { isChangingUserPassword, saveButtonDisabled, errorMessage } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>
            Change Password
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onCurrentPasswordChanged.bind(this)}
              placeholder='Current Password'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onPasswordChanged.bind(this)}
              placeholder='New Password'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onPasswordConfirmationChanged.bind(this)}
              placeholder='New Password Confirmation'/>
          </View>
          <FormButton
            onPress={this.onSavePressed.bind(this)}
            disabled={saveButtonDisabled}
            text="Save" />
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='white'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <AsyncIndicator
            active={isChangingUserPassword}
            errorMessage={errorMessage} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('UserPasswordForm', () => UserPasswordForm);

export default UserPasswordForm;
