import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import NewSession from './../containers/NewSession';
import NewAccount from './../containers/NewAccount';

const SessionStackNavigator = StackNavigator({
  NewSession: { screen: NewSession },
  NewAccount: { screen: NewAccount }
});

AppRegistry.registerComponent('SessionStackNavigator', () => SessionStackNavigator);

export default SessionStackNavigator;
