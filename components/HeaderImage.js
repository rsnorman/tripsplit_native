import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
  Button,
  Animated,
  Easing,
  AppRegistry
} from 'react-native';
import { baseUrl } from './../constants';

import Icon from 'react-native-vector-icons/FontAwesome';
var ImagePicker = require('react-native-image-picker');
import { primaryColor } from './../constants';

class HeaderImage extends Component {
  constructor(props) {
    super(props);
    this.bounceAnimation = new Animated.Value(1),
    this.shakeAnimation = new Animated.Value(0)
  }

  componentWillReceiveProps(newProps) {
    if (newProps.image.url !== this.props.image.url) {
      this.bounceAnimation.setValue(1.2);
      Animated.spring(
        this.bounceAnimation,
        {
          toValue: 1,
          friction: 3
        }
      ).start();
    }

    if (!!newProps.errorMessage && !this.props.errorMessage) {
      this._showImageUploadError();
    }
  }

  _showImageUploadError() {
    this.shakeAnimation.setValue(0);
    Animated.timing(
      this.shakeAnimation,
      {
        duration: 400,
        toValue: 3,
        ease: Easing.bounce
      }
    ).start();
  }

  onImageEditPressed() {
    // More info on all the options is below in the README...just some common use cases shown here
    let options = {
      title: `Select ${this.props.title} Image`,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        this._showImageUploadError();
      } else if (response.didCancel) {
        console.log('ImagePicker Canceled');
      } else {
        this.props.onImageSelected({ uri: response.uri, fileName: response.fileName});
      }
    });
  }

  render() {
    let imageStyles = StyleSheet.create({
      thumb: {
        width: this.props.size,
        height: this.props.size,
        borderRadius: 4,
        backgroundColor: primaryColor
      },
      thumbIcon: {
        margin: this.props.size / 4,
        textAlign: 'center'
      },
      editIcon: {
        position: 'absolute',
        right: 3,
        bottom: 4,
        backgroundColor: 'transparent'
      },
      imageUploadSpinner: {
        position: 'absolute',
        left: this.props.size / 4 + 10,
        top: this.props.size / 4 + 10,
      }
    });

    let image = this.props.image.url ?
      ( <Image source={{uri: `${baseUrl}${this.props.image.thumb.url}`}} style={imageStyles.thumb} /> ) :
      ( <Icon name={this.props.icon} style={imageStyles.thumbIcon} size={this.props.size / 2.3} color="#fff" /> );

    if (!this.props.canEdit) {
      return <View style={imageStyles.thumb}>{image}</View>;
    }

    let imageSpinner = this.props.isUploadingImage ?
      ( <ActivityIndicator style={imageStyles.imageUploadSpinner} size="large" /> ) :
      ( <View /> );

    const interpolatedShake = this.shakeAnimation.interpolate({
      inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
      outputRange: [0, -10, 0, 10, 0, -10, 0]
    });

    return (
      <TouchableHighlight
        onPress={() => this.onImageEditPressed()}
        underlayColor='#dddddd'>
        <Animated.View style={{
            transform: [
              {
                scale: this.bounceAnimation
              },
              {
                translateX: interpolatedShake
              }
            ]
          }}>
          <View style={imageStyles.thumb}>
            {image}
            <Icon name="edit" style={imageStyles.editIcon} size={15} color="#fff" />
            {imageSpinner}
          </View>
        </Animated.View>
      </TouchableHighlight>
    );
  }
}

HeaderImage.propTypes = {
  size: PropTypes.number.isRequired,
  image: PropTypes.object,
  icon: PropTypes.string,
  isUploadingImage: PropTypes.bool,
  uploadPhotoErrorMessage: PropTypes.string
};

AppRegistry.registerComponent('HeaderImage', () => HeaderImage);

export default HeaderImage;
