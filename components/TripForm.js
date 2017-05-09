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
import ButtonGroup from './ButtonGroup';
import KeyboardDismisser from './KeyboardDismisser';
import formStyles from '../styles/form';
import { primaryColor, secondaryColor, dangerColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    flex: 1
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
            color: dangerColor
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

    return (
      <KeyboardDismisser>
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
                value={this.props.trip.name}
                style={styles.input}
                autoCapitalize="words"
                onChange={this.onNameChanged.bind(this)}
                underlineColorAndroid={secondaryColor}
                placeholder="Name (e.g., Joan's Bachelorette Party)"/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.trip.location}
                style={styles.input}
                autoCapitalize="words"
                onChange={this.onLocationChanged.bind(this)}
                underlineColorAndroid={secondaryColor}
                placeholder='Location'/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={this.props.trip.description}
                style={styles.multiLineInput}
                onChange={this.onDescriptionChanged.bind(this)}
                multiline={true}
                numberOfLines={3}
                autoCapitalize="sentences"
                underlineColorAndroid={secondaryColor}
                placeholder='Description (optional)'/>
            </View>
          </View>
          <ButtonGroup>
            <AsyncIndicator
              active={isSavingTrip || isDeletingTrip}
              errorMessage={errorMessage} />
            <DeleteButton
              hidden={!showDeleteButton}
              disabled={deleteButtonDisabled}
              onPress={this.onDeletePressed.bind(this)} />
          </ButtonGroup>
          <Popup ref={popup => this.popup = popup }/>
        </View>

      </KeyboardDismisser>
    );
  }
}

AppRegistry.registerComponent('TripForm', () => TripForm);

export default TripForm;
