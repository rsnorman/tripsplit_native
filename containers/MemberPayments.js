import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchMemberPayments } from '../actions/member_actions';
import PaymentsList from '../components/PaymentsList';
import { ListView } from 'react-native';

function showEmptyMessage(membersState) {
  return membersState.memberPayments.length === 0 && !membersState.isFetchingMemberPayments && !membersState.fetchPaymentsErrorMessage;
}

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1.id !== r2.id,
    sectionHeaderHasChanged: (h1, h2) => h1 !== h2
});

const mapStateToProps = (state) => {
  const { viewedMember, memberPayments, isFetchingMemberPayments, fetchPaymentsErrorMessage } = state.members;
  const emptyMessage = state.user.user.id === viewedMember.id ?
    'What do ya got… alligator arms or something?' :
    'Someone might not be carrying their weight around here…';

  let memberDataSource;

  if (memberPayments.length > 0) {
    const paymentLabel = state.user.user.id === viewedMember.id ? 'Purchases' : 'Payments';
    let dataBlob = {};
    dataBlob[paymentLabel] = memberPayments;
    memberDataSource = dataSource.cloneWithRowsAndSections(dataBlob, [paymentLabel]);
  } else {
    memberDataSource = dataSource.cloneWithRows(memberPayments);
  }

  return {
    trip: state.trips.viewedTrip,
    member: viewedMember,
    payments: memberPayments,
    dataSource: memberDataSource,
    isFetchingMemberPayments,
    fetchPaymentsErrorMessage,
    emptyMessageVisible: showEmptyMessage(state.members),
    emptyMessage
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
