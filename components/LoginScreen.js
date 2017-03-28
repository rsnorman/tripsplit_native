import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  ActivityIndicator,
  StatusBar,
  AppRegistry
} from 'react-native';

import AsyncIndicator from './AsyncIndicator';
import FormButton from './FormButton';

var styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 30,
    marginTop: 100
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 15
  },
  loginInput: {
    height: 36,
    padding: 4,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec',
    borderRadius: 8,
    color: '#48bbec'
  },
  loginHeader: {
    backgroundColor: '#48bbec',
    padding: 30,
    alignSelf: 'stretch'
  },
  loginHeaderTitle: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

class LoginScreen extends Component {
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
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.loginHeader}>
          <Text style={styles.loginHeaderTitle}>TripSplit</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              value={email}
              style={styles.loginInput}
              keyboardType="email-address"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
              onChange={this.onEmailChanged.bind(this)}
              placeholder='Email'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={password}
              style={styles.loginInput}
              type="password"
              returnKeyType="go"
              secureTextEntry={true}
              onChange={this.onPasswordChanged.bind(this)}
              placeholder='Password'/>
          </View>
          <View style={styles.formRow}>
            <FormButton
              text="Login"
              onPress={this.onLoginPressed.bind(this)}
              disabled={loginButtonDisabled} />
          </View>
          <AsyncIndicator active={isLoggingIn} errorMessage={loginErrorMessage} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('LoginScreen', () => LoginScreen);

export default LoginScreen;
