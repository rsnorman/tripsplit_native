import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import TripsList from '../components/TripsList'

class AccountView extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.session);
  }

  render() {
    if (this.props.isFetchingTrips) {
      return <ActivityIndicator size='large'/>
    }
    return <TripsList trips={this.props.trips} />;
  }
}

export default AccountView;
