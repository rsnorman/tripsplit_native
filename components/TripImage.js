import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  AppRegistry
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';

class TripImage extends Component {
  render() {
    let iconStyles = StyleSheet.create({
      thumb: {
        width: this.props.width,
        height: this.props.height,
        marginRight: 10,
        backgroundColor: '#48bbec'
      },
      thumbIcon: {
        padding: 12
      }
    });

    return this.props.picture.url ?
      ( <Image source={{uri: 'http://localhost:3000' + rowData.picture.thumb.url}} style={styles.thumb} /> ) :
      (
        <View style={styles.thumb}>
          <Icon name="car" style={styles.thumbIcon} size={50} color="#fff" />
        </View>
      );
  }
}

TripsList.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  picture: PropTypes.object.isRequired
};

AppRegistry.registerComponent('TripsList', () => TripsList);

export default TripImage;
