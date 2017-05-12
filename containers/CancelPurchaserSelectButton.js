import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { cancelPurchasersSelect } from '../actions/purchasers_picker_actions';
import { primaryColor } from './../constants';

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
    <HeaderBackButton
      tintColor={primaryColor}
      onPress={() => onCancelPurchaserSelect()}
    />
  );
});

AppRegistry.registerComponent('CancelPurchaserSelectButton', () => CancelPurchaserSelectButton);

export default CancelPurchaserSelectButton;
