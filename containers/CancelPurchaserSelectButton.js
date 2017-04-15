import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, Button } from 'react-native';
import { cancelPurchasersSelect } from '../actions/navigation_actions';
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
    <Button
      title='Cancel'
      color={primaryColor}
      onPress={() => onCancelPurchaserSelect()}
    />
  );
});

AppRegistry.registerComponent('CancelPurchaserSelectButton', () => CancelPurchaserSelectButton);

export default CancelPurchaserSelectButton;
