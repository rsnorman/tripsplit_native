import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button, View, StyleSheet } from 'react-native';
import AsyncIndicator from './../components/AsyncIndicator';
import { confirmDeleteMember, hideConfirmDeleteMember, deleteMember } from '../actions/member_actions';
import { dangerColor } from './../constants';

const mapStateToProps = (state) => {
  let member = state.members.viewedMember;
  return {
    member,
    isVisible: !!member.actions.delete,
    isDeletingMember: state.members.isDeletingMember
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBeginRemovingMember: (member) => {
      dispatch(confirmDeleteMember(
        member,
        () => {
          dispatch(deleteMember(member));
          dispatch(hideConfirmDeleteMember());
        },
        () => {
          dispatch(hideConfirmDeleteMember());
        }
      ));
    }
  };
};

const styles = StyleSheet.create({
  spinner: {
    marginRight: 5
  }
})

const RemoveMemberButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ member, isDeletingMember, isVisible, onBeginRemovingMember }) => {
  if (!isVisible) {
    return <View />;
  }

  if (isDeletingMember) {
    return <View style={styles.spinner}><AsyncIndicator active={true} size="small" /></View>
  }

  return (
    <Button
      color={dangerColor}
      title='Remove'
      onPress={() => onBeginRemovingMember(member)}
    />
  );
});

AppRegistry.registerComponent('RemoveMemberButton', () => RemoveMemberButton);

export default RemoveMemberButton;
