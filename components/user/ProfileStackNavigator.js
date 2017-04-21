import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import UserProfile from './../containers/UserProfile';

const ProfileStackNavigator = StackNavigator({
  Profile: { screen: UserProfile }
});

AppRegistry.registerComponent('ProfileStackNavigator', () => ProfileStackNavigator);

export default ProfileStackNavigator;
