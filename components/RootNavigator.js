import { DrawerNavigator } from 'react-navigation';
import ActiveTripStackNavigator from './../containers/ActiveTripStackNavigator';
import Logout from './../containers/Logout';

const RootNavigator = DrawerNavigator({
  Home: {
    screen: ActiveTripStackNavigator
  },
  Logout: {
    screen: Logout
  }
}, {
    initialRouteName: 'Home'
});

export default RootNavigator;
