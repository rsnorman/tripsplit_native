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

class UserForm extends Component {
  onNameChanged(event) {
    this.props.onUserAttributeSet('name', event.nativeEvent.text);
  }
  onEmailChanged(event) {
    this.props.onUserAttributeSet('location', event.nativeEvent.text);
  }

  onSavePressed() {
    this.props.onSave(this.props.user);
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  render() {
    let spinner = this.props.isSavingUser ?
      ( <ActivityIndicator size='large' style={styles.spinner} /> ) :
      ( <View/> );

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
              value={this.props.user.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.user.email}
              style={styles.input}
              onChange={this.onEmailChanged.bind(this)}
              placeholder='Location'/>
          </View>
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.button}
              onPress={this.onSavePressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableHighlight>
          </View>
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

AppRegistry.registerComponent('UserForm', () => UserForm);

export default UserForm;
