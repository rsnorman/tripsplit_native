import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setNewMemberAttr, createTripMember, cancelAddingMember } from '../actions/member_actions';
import MemberForm from '../components/MemberForm'

const mapStateToProps = (state) => {
  const {
    isSavingMember,
    errorMessage,
    newMember,
    saveButtonDisabled
  } = state.members;

  return {
    title: 'Add Member',
    member: newMember,
    isSavingMember,
    errorMessage,
    saveButtonDisabled
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMemberAttributeSet: (attributeName: string, attributeValue: string) => {
      dispatch(setNewMemberAttr(attributeName, attributeValue));
    },
    onSave: (newMember) => {
      dispatch(createTripMember(newMember));
    },
    onCancel: () => {
      dispatch(cancelAddingMember());
    }
  };
};

const NewMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberForm);

AppRegistry.registerComponent('NewMember', () => NewMember);

export default NewMember;
