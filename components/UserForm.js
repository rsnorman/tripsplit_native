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
    backgroundColor: '#48bbec',
    borderColor: '#48bbec',
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

  onCancelPressed() {
    this.props.onCancel();
  }

  render() {
    const { user, isSavingUser, saveButtonDisabled, errorMessage } = this.props;

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
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <AsyncIndicator
            active={isSavingUser}
            errorMessage={errorMessage} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('UserForm', () => UserForm);

export default UserForm;
