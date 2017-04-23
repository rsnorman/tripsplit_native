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
import ModalFormHeader from './ModalFormHeader';

import formStyles from '../styles/form';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
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
        <ModalFormHeader
          title={title}
          submitText="Add"
          onSubmitPress={this.onSavePressed.bind(this)}
          submitButtonDisabled={saveButtonDisabled}
          onCancelPress={this.onCancelPressed.bind(this)} />
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
