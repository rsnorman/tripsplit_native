import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { } from '../actions/member_actions';
import MemberView from './../components/MemberView'

const mapStateToProps = (state) => {
  return {
    member: state.members.viewedMember,
    isLoggedInUser: state.members.viewedMember.id == state.user.user.id,
    isFetchingMemberPurchases: true
  };
};

const mapDispatchToProps = (dispatch) => {
    return { };
};

const VisibleMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberView);

AppRegistry.registerComponent('VisibleMember', () => VisibleMember);

export default VisibleMember;
