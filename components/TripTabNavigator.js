import TabListNavigator from './TabListNavigator';
import { AppRegistry, View } from 'react-native';
import TripExpenses from './../containers/TripExpenses';
import TripMembers from './../containers/TripMembers';

const TripTabNavigator = TabListNavigator({
  TripExpenses: { screen: TripExpenses, icon: 'dollar' },
  TripMembers: { screen: TripMembers, icon: 'users' }
});

AppRegistry.registerComponent('TripTabNavigator', () => TripTabNavigator);

export default TripTabNavigator;
