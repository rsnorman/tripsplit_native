import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import HeaderButton from './../components/HeaderButton';
import { cancelPurchasersSelect } from '../actions/purchasers_picker_actions';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCancelPurchaserSelect: () => {
      dispatch(cancelPurchasersSelect());
    }
  };
};

const CancelPurchaserSelectButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ onCancelPurchaserSelect }) => {
  return (
    <HeaderButton
      title='Cancel'
      onPress={() => onCancelPurchaserSelect()}
    />
  );
});

AppRegistry.registerComponent('CancelPurchaserSelectButton', () => CancelPurchaserSelectButton);

export default CancelPurchaserSelectButton;
