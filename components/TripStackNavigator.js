import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import UserTrips from './../containers/UserTrips';
import VisibleTrip from './../containers/VisibleTrip';
import VisibleExpense from './../containers/VisibleExpense';
import VisibleMember from './../containers/VisibleMember';
import VisibleObligation from './../containers/VisibleObligation';

const TripStackNavigator = StackNavigator({
  UserTrips: { screen: UserTrips },
  VisibleTrip: { screen: VisibleTrip },
  VisibleExpense: { screen: VisibleExpense },
  VisibleMember: { screen: VisibleMember },
  VisibleObligation: { screen: VisibleObligation }
});

AppRegistry.registerComponent('TripStackNavigator', () => TripStackNavigator);

export default TripStackNavigator;
