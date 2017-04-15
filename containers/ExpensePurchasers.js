import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { selectPurchaser } from '../actions/purchasers_picker_actions';
import PurchasersList from '../components/PurchasersList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  let { purchasers } = state.trips.viewedTrip;
  let { selectedPurchaserId, onPurchaserSelected } = state.purchasersPicker;

  purchasers = [{name: 'You', picture: state.user.user.picture}, ...purchasers];

  return {
    onSelect: onPurchaserSelected,
    selectedPurchaser: purchasers.filter((p) => p.id == selectedPurchaserId)[0],
    purchasers: purchasers,
    dataSource: dataSource.cloneWithRows(purchasers)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaserSelected: (purchaser, onSelect) => {
      dispatch(selectPurchaser(purchaser, onSelect));
    }
  };
};

const ExpensePurchasers = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasersList);

AppRegistry.registerComponent('ExpensePurchasers', () => ExpensePurchasers);

export default ExpensePurchasers;
