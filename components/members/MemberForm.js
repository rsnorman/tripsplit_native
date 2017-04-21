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

import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';

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

class MemberForm extends Component {
  onNameChanged(event) {
    this.props.onMemberAttributeSet('name', event.nativeEvent.text);
  }
  onEmailChanged(event) {
    this.props.onMemberAttributeSet('email', event.nativeEvent.text);
  }

  onSavePressed() {
    this.props.onSave(this.props.member);
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  render() {
    const {
      member,
      isSavingMember,
      title,
      errorMessage,
      saveButtonDisabled
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.formHeader}>
          <Text style={styles.formHeaderText}>
            {title}
          </Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              value={member.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={member.email}
              keyboardType="email-address"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              onChange={this.onEmailChanged.bind(this)}
              placeholder='Email'/>
          </View>
          <FormButton
            onPress={this.onSavePressed.bind(this)}
            text="Save"
            disabled={saveButtonDisabled} />
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='white'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <AsyncIndicator
            active={isSavingMember}
            errorMessage={errorMessage} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('MemberForm', () => MemberForm);

export default MemberForm;
