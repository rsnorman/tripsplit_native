import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class FloatingButton extends Component {
  onButtonPressed() {
    this.props.onButtonPressed && this.props.onButtonPressed();
  }

  render() {
    let buttonStyles = StyleSheet.create({
      floatingButton: {
        width: this.props.size,
        height: this.props.size,
        backgroundColor: '#48bbec',
        borderRadius: this.props.size / 2,
        position: 'absolute',
        bottom: 10,
        right: 10,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
      },
      icon: {
        width: this.props.size / 2,
        height: this.props.size / 2,
        marginTop: this.props.size / 4,
        marginLeft: this.props.size / 4,
        fontSize: this.props.size / 2,
        color: 'white',
        textAlign: 'center'
      }
    });

    return (
      <TouchableHighlight
        style={buttonStyles.floatingButton}
        onPress={this.onButtonPressed.bind(this)}
        underlayColor="#54CBFD">
        <Icon name={this.props.icon} style={buttonStyles.icon} />
      </TouchableHighlight>
    );
  }
}

FloatingButton.propTypes = {
  size: PropTypes.number.isRequired,
  image: PropTypes.object,
  icon: PropTypes.string
};

AppRegistry.registerComponent('FloatingButton', () => FloatingButton);

export default FloatingButton;
