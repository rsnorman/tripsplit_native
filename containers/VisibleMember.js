import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { updateMemberImage } from '../actions/member_actions';
import MemberView from './../components/MemberView'

const mapStateToProps = (state) => {
  const { viewedMember, isUploadingMemberImage, uploadPhotoErrorMessage } = state.members;
  console.log(viewedMember);
  return {
    member: viewedMember,
    isLoggedInUser: viewedMember.id == state.user.user.id,
    isFetchingMemberPurchases: true,
    canEditPhoto: !!viewedMember.actions.update,
    isUploadingMemberImage,
    uploadPhotoErrorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      onMemberImageChanged: (member, image) => {
        dispatch(updateMemberImage(member, image))
      }
    };
};

const VisibleMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberView);

AppRegistry.registerComponent('VisibleMember', () => VisibleMember);

export default VisibleMember;
