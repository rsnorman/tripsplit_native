import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchMemberPayments } from '../actions/member_actions';
import PaymentsList from '../components/PaymentsList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
});

const mapStateToProps = (state) => {
  const { viewedMember, memberPayments, isFetchingMemberPayments, fetchPaymentsErrorMessage } = state.members;

  return {
    trip: state.trips.viewedTrip,
    member: viewedMember,
    payments: memberPayments,
    dataSource: dataSource.cloneWithRows(memberPayments),
    isFetchingMemberPayments,
    fetchPaymentsErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPaymentsLoad: (trip, member) => {
      dispatch(fetchMemberPayments(trip, member));
    }
  };
};

const TripPayments = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsList);

AppRegistry.registerComponent('TripPayments', () => TripPayments);

export default TripPayments;
