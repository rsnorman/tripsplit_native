import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { primaryColor, secondaryColor } from './../constants';

class FloatingButton extends Component {
  onButtonPressed() {
    this.props.onButtonPressed && this.props.onButtonPressed();
  }

  render() {
    const { size, icon } = this.props;
    const iconSize = this.props.size / 2;

    let buttonStyles = StyleSheet.create({
      floatingButton: {
        width: this.props.size,
        height: this.props.size,
        backgroundColor: primaryColor,
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
        width: iconSize,
        height: iconSize,
        marginTop: (size - iconSize) / 2,
        marginLeft: (size - iconSize) / 2,
        fontSize: iconSize * 0.9,
        color: 'white',
        textAlign: 'center'
      }
    });

    return (
      <TouchableHighlight
        style={buttonStyles.floatingButton}
        onPress={this.onButtonPressed.bind(this)}
        underlayColor={secondaryColor}>
        <Icon name={icon} style={buttonStyles.icon} />
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
