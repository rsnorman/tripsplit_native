import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import formStyles from '../styles/form';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
  }
});

class ModalFormHeader extends Component {
  render() {
    const {
      title,
      onSubmitPress,
      onCancelPress,
      submitText,
      submitButtonDisabled,
    } = this.props;

    const submitButton = submitButtonDisabled ?
      (
        <Text style={[styles.modalButton, styles.submitModalButton, styles.disabledModalButton]}>{submitText}</Text>

      ) :
      (
        <TouchableHighlight
          underlayColor="transparent"
          disabled={submitButtonDisabled}
          onPress={onSubmitPress}>
          <Text style={[styles.modalButton, styles.submitModalButton]}>{submitText}</Text>
        </TouchableHighlight>
      );

    return (
      <View style={styles.formHeader}>
        <TouchableHighlight
          underlayColor="transparent"
          onPress={onCancelPress}>
          <Text style={styles.modalButton}>Cancel</Text>
        </TouchableHighlight>
        <Text style={styles.formHeaderText}>{title}</Text>
        {submitButton}
      </View>
    );
  }
}

AppRegistry.registerComponent('ModalFormHeader', () => ModalFormHeader);

export default ModalFormHeader;
