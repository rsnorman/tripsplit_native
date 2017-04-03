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

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
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
  spinner: {
    marginTop: 15
  }
});

class TripForm extends Component {
  onNameChanged(event) {
    this.props.onTripAttributeSet('name', event.nativeEvent.text);
  }
  onLocationChanged(event) {
    this.props.onTripAttributeSet('location', event.nativeEvent.text);
  }
  onDescriptionChanged(event) {
    this.props.onTripAttributeSet('description', event.nativeEvent.text);
  }

  onSavePressed() {
    this.props.onSave(this.props.trip);
  }

  onCancelPressed() {
    this.props.onCancel();
  }

  onDeletePressed() {
    this.popup.confirm({
      title: 'Delete Trip',
      content: ['Are you sure you want to delete?'],
      ok: {
        text: 'Yes',
        style: {
            color: 'red'
        },
        callback: () => {
            this.props.onDelete(this.props.trip);
        },
      },
      cancel: {
        text: 'Cancel'
      },
    });
  }

  render() {
    const {
      trip,
      isSavingTrip,
      isDeletingTrip,
      showDeleteButton,
      title,
      errorMessage,
      saveButtonDisabled,
      deleteButtonDisabled
    } = this.props;

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
              value={this.props.trip.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.trip.location}
              style={styles.input}
              onChange={this.onLocationChanged.bind(this)}
              placeholder='Location'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.trip.description}
              style={styles.multiLineInput}
              onChange={this.onDescriptionChanged.bind(this)}
              multiline={true}
              numberOfLines={3}
              placeholder='Description'/>
          </View>
          <FormButton
            onPress={this.onSavePressed.bind(this)}
            text="Save"
            disabled={saveButtonDisabled} />
          <DeleteButton
            hidden={!showDeleteButton}
            disabled={deleteButtonDisabled}
            onPress={this.onDeletePressed.bind(this)} />
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.cancelButton}
              onPress={this.onCancelPressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableHighlight>
          </View>
          <AsyncIndicator
            style={styles.spinner}
            active={isSavingTrip || isDeletingTrip}
            errorMessage={errorMessage} />
        </View>
        <Popup ref={popup => this.popup = popup }/>
      </View>
    );
  }
}

AppRegistry.registerComponent('TripForm', () => TripForm);

export default TripForm;
