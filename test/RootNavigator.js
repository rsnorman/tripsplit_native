import { DrawerNavigator } from 'react-navigation';
import Home from './Home';
import Notifications from './Notifications';

/**
 * The root navigator.
 * If your app should have a drawer, this is the place for it.
 * If not, just place any other navigator here.
 */
const RootNavigator = DrawerNavigator({
  Notifications: {
      screen: Notifications
  },
    Home: {
        screen: Home
    },
}, {
    //initialRouteName: 'Notifications',
    // Uncomment this if you want to use your own custom drawer component.
    // contentComponent: Drawer
});

export default RootNavigator;
