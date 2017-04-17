import React from 'react';
import { DrawerNavigator, DrawerView } from 'react-navigation';
import ActiveTripStackNavigator from './../containers/ActiveTripStackNavigator';
import UserProfileStackNavigator from './../containers/UserProfileStackNavigator';
import Logout from './../containers/Logout';

import { primaryColor, secondaryColor } from './../constants';

const RootNavigator = DrawerNavigator({
  Home: {
    screen: ActiveTripStackNavigator
  },
  Profile: {
    screen: UserProfileStackNavigator
  },
  Logout: {
    screen: Logout
  }
}, {
    initialRouteName: 'Home',
    contentOptions: {
      activeTintColor: primaryColor,
      inactiveTintColor: secondaryColor
    }
});

export default RootNavigator;
