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
import ModalFormHeader from './ModalFormHeader';

import formStyles from '../styles/form';
import { primaryColor, secondaryColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
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
        <ModalFormHeader
          title="Change Password"
          submitText="Save"
          onSubmitPress={this.onSavePressed.bind(this)}
          submitButtonDisabled={saveButtonDisabled}
          onCancelPress={this.onCancelPressed.bind(this)} />
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onCurrentPasswordChanged.bind(this)}
              underlineColorAndroid={secondaryColor}
              placeholder='Current Password'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onPasswordChanged.bind(this)}
              underlineColorAndroid={secondaryColor}
              placeholder='New Password'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              style={styles.input}
              type="password"
              secureTextEntry={true}
              onChange={this.onPasswordConfirmationChanged.bind(this)}
              underlineColorAndroid={secondaryColor}
              placeholder='New Password Confirmation'/>
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
