import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import ActiveHome from './../containers/ActiveHome';
import VisibleTrip from './../containers/VisibleTrip';
import VisibleExpense from './../containers/VisibleExpense';
import VisibleObligation from './../containers/VisibleObligation';

const AppNavigator = StackNavigator({
  ActiveHome: { screen: ActiveHome },
  VisibleTrip: { screen: VisibleTrip },
  VisibleExpense: { screen: VisibleExpense },
  VisibleObligation: { screen: VisibleObligation }
});


AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
