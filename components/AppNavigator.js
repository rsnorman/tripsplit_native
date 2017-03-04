import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import ActiveHome from './../containers/ActiveHome';
import VisibleTrip from './../containers/VisibleTrip';
import VisibleExpense from './../containers/VisibleExpense';

const AppNavigator = StackNavigator({
  ActiveHome: { screen: ActiveHome },
  VisibleTrip: { screen: VisibleTrip },
  VisibleExpense: { screen: VisibleExpense }
});


AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
