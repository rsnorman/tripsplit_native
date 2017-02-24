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

var styles = StyleSheet.create({
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
    marginBottom: 10,
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
  }
});

class NewTripForm extends Component {
  onNameChanged(event) {
    this.props.onTripAttributeSet('name', event.nativeEvent.text);
  }
  onLocationChanged(event) {
    this.props.onTripAttributeSet('location', event.nativeEvent.text);
  }
  onDescriptionChanged(event) {
    this.props.onTripAttributeSet('detail', event.nativeEvent.text);
  }

  onCreatePressed() {
    this.props.onCreate(this.props.session, this.props.newTrip)
  }

  render() {
    let spinner = this.props.isCreatingTrip ?
      ( <ActivityIndicator size='large'/> ) :
      ( <View/> );

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.newTrip.name}
              style={styles.input}
              onChange={this.onNameChanged.bind(this)}
              placeholder='Name'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.newTrip.location}
              style={styles.input}
              onChange={this.onLocationChanged.bind(this)}
              placeholder='Location'/>
          </View>
          <View style={styles.formRow}>
            <TextInput
              value={this.props.newTrip.description}
              style={styles.multiLineInput}
              onChange={this.onDescriptionChanged.bind(this)}
              multiline={true}
              numberOfLines={3}
              placeholder='Description'/>
          </View>
          <View style={styles.formRow}>
            <TouchableHighlight style={styles.button}
              onPress={this.onCreatePressed.bind(this)}
              underlayColor='#99d9f4'>
              <Text style={styles.buttonText}>Create</Text>
            </TouchableHighlight>
          </View>
          {spinner}
          <Text style={styles.description}>{this.props.message}</Text>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('NewTripForm', () => NewTripForm);

export default NewTripForm;
