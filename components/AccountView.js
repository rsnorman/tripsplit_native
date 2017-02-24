import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry } from 'react-native';
import UserTrips from '../containers/UserTrips'

class AccountView extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.session);
  }

  render() {
    if (this.props.isFetchingTrips) {
      return <ActivityIndicator size='large'/>
    }
    return <UserTrips />;
  }
}

AppRegistry.registerComponent('AccountView', () => AccountView);

export default AccountView;
