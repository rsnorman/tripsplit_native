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
  Keyboard,
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
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: secondaryColor,
      height: 100,
    },
    headerTitleStyle: {
      marginTop: 20,
      marginBottom: 20,
      fontSize: 28,
      fontFamily: 'Black Ops One',
      color: 'white'
    },
    headerTintColor: 'white'
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
    Keyboard.dismiss();
    this.props.onLoginViewPress();
  }

  onNameNextPress() {
    this.refs.emailInput.focus();
  }

  onEmailNextPress() {
    this.refs.passwordInput.focus();
  }

  onSubmitPress() {
    this.props.onRegister(this.props.name, this.props.email, this.props.password);
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
                style={styles.input}
                autoCapitalize="words"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={this.onNameNextPress.bind(this)}
                onChange={this.onNameChanged.bind(this)}
                underlineColorAndroid={secondaryColor}
                placeholder='Name'/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                ref="emailInput"
                value={email}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={this.onEmailNextPress.bind(this)}
                onChange={this.onEmailChanged.bind(this)}
                underlineColorAndroid={secondaryColor}
                placeholder='Email'/>
            </View>
            <View style={styles.formRow}>
              <TextInput
                ref="passwordInput"
                value={password}
                style={styles.input}
                type="password"
                secureTextEntry={true}
                onChange={this.onPasswordChanged.bind(this)}
                returnKeyType="go"
                onSubmitEditing={this.onSubmitPress.bind(this)}
                underlineColorAndroid={secondaryColor}
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
