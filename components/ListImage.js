import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  AppRegistry
} from 'react-native';
import { baseUrl } from './../constants';

import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryColor } from './../constants';

class ListImage extends Component {
  render() {
    let iconStyles = StyleSheet.create({
      thumb: {
        width: this.props.size,
        height: this.props.size,
        marginRight: 10,
        borderRadius: this.props.size / 2,
        backgroundColor: primaryColor
      },
      thumbIcon: {
        margin: this.props.size / 4,
        textAlign: 'center'
      }
    });
    return this.props.image && this.props.image.url ?
      ( <Image source={{uri: `${baseUrl}${this.props.image.thumb.url}`}} style={iconStyles.thumb} /> ) :
      (
        <View style={iconStyles.thumb}>
          <Icon name={this.props.icon} style={iconStyles.thumbIcon} size={this.props.size / 2.3} color="#fff" />
        </View>
      );
  }
}

ListImage.propTypes = {
  size: PropTypes.number.isRequired,
  image: PropTypes.object,
  icon: PropTypes.string
};

AppRegistry.registerComponent('ListImage', () => ListImage);

export default ListImage;
