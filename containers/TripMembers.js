import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { fetchTripMembers, viewMember } from '../actions/member_actions';
import MembersList from '../components/MembersList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  return {
    trip: state.trips.viewedTrip,
    members: state.members.tripMembers,
    dataSource: dataSource.cloneWithRows(state.members.tripMembers),
    isFetchingTripMembers: state.members.isFetchingTripMembers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMembersLoad: (trip) => {
      dispatch(fetchTripMembers(trip));
    },
    onMemberSelected: (member) => {
      dispatch(viewMember(member));
    }
  };
};

const TripMembers = connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList);

AppRegistry.registerComponent('TripMembers', () => TripMembers);

export default TripMembers;
