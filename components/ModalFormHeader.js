import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Keyboard,
  AppRegistry
} from 'react-native';
import HeaderButton from './../components/HeaderButton';

import formStyles from '../styles/form';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    alignItems: 'center'
  }
});

class ModalFormHeader extends Component {
  onSubmitPress() {
    Keyboard.dismiss();
    this.props.onSubmitPress();
  }

  onCancelPress() {
    Keyboard.dismiss();
    this.props.onCancelPress();
  }

  render() {
    const {
      title,
      submitText,
      submitButtonDisabled
    } = this.props;

    return (
      <View style={styles.formHeader}>
        <HeaderButton
          onPress={this.onCancelPress.bind(this)}
          text="Cancel" />
        <Text style={styles.formHeaderText}>{title}</Text>
        <HeaderButton
          disabled={submitButtonDisabled}
          onPress={this.onSubmitPress.bind(this)}
          bold={true}
          text={submitText} />
      </View>
    );
  }
}

AppRegistry.registerComponent('ModalFormHeader', () => ModalFormHeader);

export default ModalFormHeader;
