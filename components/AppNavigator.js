import { StackNavigator } from 'react-navigation';
import ActiveHome from './../containers/ActiveHome'

const AppNavigator = StackNavigator({
  ActiveHome: { screen: ActiveHome }
});

export default AppNavigator;
