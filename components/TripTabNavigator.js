import TabListNavigator from './TabListNavigator';
import { AppRegistry, View } from 'react-native';

const TripTabNavigator = TabListNavigator({
  TripExpenses: { icon: 'dollar' },
  TripMembers: { icon: 'users' }
});

AppRegistry.registerComponent('TripTabNavigator', () => TripTabNavigator);

export default TripTabNavigator;
