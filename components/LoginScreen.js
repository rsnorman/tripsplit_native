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

const ScreenWidth = Dimensions.get("window").width;
import formStyles from '../styles/form';
import { primaryColor, secondaryColor } from './../constants';

var styles = StyleSheet.create({
  ...formStyles,
  container: {
    flex: 1,
    alignItems: 'center'
  },
  loginHeader: {
    backgroundColor: primaryColor,
    padding: 30,
    alignSelf: 'stretch'
  },
  loginHeaderTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  registerSection: {
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
  registerMessage: {
    color: 'gray',
    fontSize: 12
  },
  registerButton: {
    padding: 10
  },
  registerButtonText: {
    color: primaryColor,
    fontSize: 12
  }
});

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'TripSplit',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: primaryColor,
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

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  onEmailChanged(event) {
    this.props.onEmailChange(event.nativeEvent.text);
  }

  onPasswordChanged(event) {
    this.props.onPasswordChange(event.nativeEvent.text);
  }

  onLoginPressed() {
    Keyboard.dismiss();
    this.props.onLogin(this.props.email, this.props.password);
  }

  onRegisterPress() {
    this.props.onRegisterViewPress();
  }

  onNextPress() {
    this.refs.passwordInput.focus();
  }

  onSubmitPress() {
    this.props.onLogin(this.props.email, this.props.password);
  }

  render() {
    const {
      email,
      password,
      isLoggingIn,
      loginErrorMessage,
      loginButtonDisabled
    } = this.props;

    return (
      <KeyboardDismisser>
        <View style={styles.container}>
          <StatusBar barStyle='light-content' />
            <View style={styles.form}>
              <View style={styles.formRow}>
                <TextInput
                  value={email}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  onSubmitEditing={this.onNextPress.bind(this)}
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
                text="Login"
                onPress={this.onLoginPressed.bind(this)}
                disabled={loginButtonDisabled} />
              <AsyncIndicator active={isLoggingIn} errorMessage={loginErrorMessage} />
            </View>
          <View style={styles.registerSection}>
            <Text style={styles.registerMessage}>Don't have an account?</Text>
            <TouchableHighlight
              style={styles.registerButton}
              underlayColor='transparent'
              onPress={this.onRegisterPress.bind(this)}>
              <Text style={styles.registerButtonText}>Sign up.</Text>
            </TouchableHighlight>
          </View>
        </View>
      </KeyboardDismisser>
    );
  }
}

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

export default LoginScreen;
