import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, TouchableHighlight, StyleSheet } from 'react-native';
import { openDrawer } from '../actions/navigation_actions';
import Icon from 'react-native-vector-icons/FontAwesome';

let styles = StyleSheet.create({
  drawer: {
    padding: 10,
  },
  drawerIcon: {
    color: '#48bbec'
  }
});

const mapStateToProps = (state) => {
  return { };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenDrawerPress: () => {
      dispatch(openDrawer());
    }
  };
};

const OpenDrawerButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onOpenDrawerPress }) => {
  return (
    <TouchableHighlight
      style={styles.drawer}
      onPress={() => onOpenDrawerPress()}
      underlayColor="transparent">
      <Icon name="bars" size={24} style={styles.drawerIcon} />
    </TouchableHighlight>
  );
});

AppRegistry.registerComponent('OpenDrawerButton', () => OpenDrawerButton);

export default OpenDrawerButton;
