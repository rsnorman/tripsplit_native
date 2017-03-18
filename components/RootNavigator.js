import { DrawerNavigator } from 'react-navigation';
import ActiveTripStackNavigator from './../containers/ActiveTripStackNavigator';
import UserProfileStackNavigator from './../containers/UserProfileStackNavigator';
import Logout from './../containers/Logout';

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
    initialRouteName: 'Home'
});

export default RootNavigator;
