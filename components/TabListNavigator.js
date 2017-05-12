import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryColor } from './../constants';

let styles = StyleSheet.create({
  tabNavigator: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    backgroundColor: '#E9E9EF',
    opacity: 0.9,
    elevation: 1
  },
  tabActive: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: primaryColor
  },
  tab: {
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
  },
  tabIconActive: {
    textAlign: 'center',
    fontSize: 30,
    color: primaryColor,
  },
  tabIcon: {
    textAlign: 'center',
    fontSize: 30,
    color: '#cdcdcd',
  }
});

const TabListNavigator = (tabConfiguration) => {
  return (props: *) => {
    function onTabPress(tabIndex) {
      props.onTabSelect(tabIndex);
    }

    function renderTab(tab, tabIndex) {
      let tabStyle = props.activeTabIndex === tabIndex ?  styles.tabActive : styles.tab;
      let tabIconStyle = props.activeTabIndex === tabIndex ?  styles.tabIconActive : styles.tabIcon;

      return (
        <View key={tab.icon} style={tabStyle}>
          <TouchableHighlight
             onPress={() => onTabPress(tabIndex)}
             underlayColor='transparent'>
            <Icon name={tab.icon} style={tabIconStyle} />
          </TouchableHighlight>
        </View>
      );
    }

    let tabs = Object.values(tabConfiguration).map(renderTab);

    return (
      <View style={styles.tabNavigator}>
        {tabs}
      </View>
    );
  };
}

export default TabListNavigator;
