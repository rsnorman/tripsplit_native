import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  Button,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  AppRegistry
} from 'react-native';

import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';
import KeyboardDismisser from './KeyboardDismisser';

let ScreenWidth = Dimensions.get("window").width;
import formStyles from '../styles/form';
import { primaryColor, secondaryColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    flex: 1,
    alignItems: 'center'
  },
  registerInput: {
    height: 36,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    color: primaryColor
  },
  registerHeader: {
    backgroundColor: primaryColor,
    padding: 30,
    alignSelf: 'stretch'
  },
  registerHeaderTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  loginSection: {
    width: ScreenWidth,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 40,
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: secondaryColor,
    flexDirection: 'row',
    justifyContent:'center'
  },
  loginMessage: {
    color: 'gray',
    fontSize: 12
  },
  loginButton: {
    padding: 10
  },
  loginButtonText: {
    color: primaryColor,
    fontSize: 12
  }
});

class RegisterScreen extends Component {
  static navigationOptions = {
    title: 'TripSplit',
    header: {
      style: {
        backgroundColor: secondaryColor,
        height: 100
      },
      titleStyle: {
        marginTop: 20,
        fontSize: 28,
        fontFamily: 'Black Ops One'
      },
      tintColor: 'white'
    }
  };

  onNameChanged(event) {
    this.props.onNameChange(event.nativeEvent.text);
  }

  onEmailChanged(event) {
    this.props.onEmailChange(event.nativeEvent.text);
  }

  onPasswordChanged(event) {
    this.props.onPasswordChange(event.nativeEvent.text);
  }

  onRegisterPress() {
    this.props.onRegister(this.props.name, this.props.email, this.props.password);
  }

  onLoginPress() {
    this.props.onLoginViewPress();
  }

  render() {
    const {
      name,
      email,
      password,
      isRegistering,
      registerErrorMessage,
      registerButtonDisabled
    } = this.props;

    return (
      <KeyboardDismisser>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
          <View style={styles.form}>
            <View style={styles.formRow}>
              <TextInput
                value={name}
                style={styles.registerInput}
                autoCapitalize="words"
                autoCorrect={false}
                onChange={this.onNameChanged.bind(this)}
                placeholder='Name'/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={email}
                style={styles.registerInput}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onChange={this.onEmailChanged.bind(this)}
                placeholder='Email'/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                value={password}
                style={styles.registerInput}
                type="password"
                secureTextEntry={true}
                onChange={this.onPasswordChanged.bind(this)}
                placeholder='Password'/>
            </View>
            <FormButton
              text="Register"
              onPress={this.onRegisterPress.bind(this)}
              disabled={registerButtonDisabled} />
            <AsyncIndicator active={isRegistering} errorMessage={registerErrorMessage} />
          </View>
          <View style={styles.loginSection}>
            <Text style={styles.loginMessage}>Already have an account?</Text>
            <TouchableHighlight
              style={styles.loginButton}
              underlayColor='transparent'
              onPress={this.onLoginPress.bind(this)}>
              <Text style={styles.loginButtonText}>Login.</Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardDismisser>
    );
  }
}

AppRegistry.registerComponent('RegisterScreen', () => RegisterScreen);

export default RegisterScreen;
