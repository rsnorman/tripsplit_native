import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  AppRegistry
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

class ListImage extends Component {
  render() {
    let iconStyles = StyleSheet.create({
      thumb: {
        width: this.props.size,
        height: this.props.size,
        marginRight: 10,
        borderRadius: this.props.size / 2,
        backgroundColor: '#48bbec'
      },
      thumbIcon: {
        padding: 12
      }
    });
    return this.props.image && this.props.image.url ?
      ( <Image source={{uri: 'http://localhost:3000' + this.props.image.thumb.url}} style={iconStyles.thumb} /> ) :
      (
        <View style={iconStyles.thumb}>
          <Icon name={this.props.icon} size={this.props.size} color="#fff" />
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
