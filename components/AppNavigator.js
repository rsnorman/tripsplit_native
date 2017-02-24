import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import ActiveHome from './../containers/ActiveHome';
import VisibleTrip from './../containers/VisibleTrip';

const AppNavigator = StackNavigator({
  ActiveHome: { screen: ActiveHome },
  VisibleTrip: { screen: VisibleTrip }
});


AppRegistry.registerComponent('AppNavigator', () => AppNavigator);

export default AppNavigator;
