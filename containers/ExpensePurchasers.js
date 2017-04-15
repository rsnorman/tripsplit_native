import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { selectPurchaser } from '../actions/expense_actions';
import PurchasersList from '../components/PurchasersList';
import { ListView } from 'react-native';

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

const mapStateToProps = (state) => {
  let { purchasers } = state.trips.viewedTrip;
  let { newExpense } = state.expenses;

  purchasers = [{name: 'You', picture: state.user.user.picture}, ...purchasers];

  return {
    selectedPurchaser: purchasers.filter((p) => p.id == newExpense.purchaser_id)[0],
    purchasers: purchasers,
    dataSource: dataSource.cloneWithRows(purchasers)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaserSelected: (purchaser) => {
      dispatch(selectPurchaser(purchaser));
    }
  };
};

const ExpensePurchasers = connect(
  mapStateToProps,
  mapDispatchToProps
)(PurchasersList);

AppRegistry.registerComponent('ExpensePurchasers', () => ExpensePurchasers);

export default ExpensePurchasers;
