import { NavigationActions } from 'react-navigation';
import ProfileStackNavigator from './../../components/ProfileStackNavigator';

const profileNav = (state, action) => {
  switch (action.type) {
    default:
      return ProfileStackNavigator.router.getStateForAction(action, state);
  }
};

export default profileNav;
