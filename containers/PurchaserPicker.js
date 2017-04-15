import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry, TouchableHighlight, Text, View, StyleSheet } from 'react-native';
import { viewPurchasers } from '../actions/navigation_actions';
import { primaryColor } from './../constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import formStyles from '../styles/form';
const styles = StyleSheet.create({
  ...formStyles,
  picker: {
    height: 36,
    padding: 4,
    flex: 4,
    borderWidth: 1,
    borderColor: primaryColor,
    borderRadius: 8
  },
  pickerText: {
    fontSize: 18,
    color: primaryColor
  },
  pickerPlaceholderText: {
    fontSize: 18,
    color: '#B6B6BB'
  },
  arrowIcon: {
    fontSize: 18,
    color: primaryColor,
    position: 'absolute',
    right: 5,
    top: 2
  }
});

const mapStateToProps = (state) => {
  return {
    purchasers: state.trips.viewedTrip.purchasers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onBeginPickingPurchasers: (expense) => {
      dispatch(viewPurchasers(expense));
    }
  };
};

const PurchaserPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ purchasers, expense, onBeginPickingPurchasers }) => {
  if (!purchasers || purchasers.length == 0) {
    return <View />;
  }

  function getPurchaserName(purchasers, purchaserId) {
    return purchasers.filter((purchaser) => {
      return purchaser.id === purchaserId;
    }).map((purchaser) => purchaser.name)[0];
  }

  const purchaser = getPurchaserName(purchasers, expense.purchaser_id);
  const purchaserText = !!purchaser ?
    (
      <Text style={styles.pickerText}>{purchaser}</Text>
    ) :
    (
      <Text style={styles.pickerPlaceholderText}>Purchaser: You</Text>
    );
  const purchaserTextStyle = !!purchaser
  return (
    <View style={styles.formRow}>
      <TouchableHighlight
        style={styles.picker}
        color={primaryColor}
        underlayColor="transparent"
        onPress={() => onBeginPickingPurchasers(expense)}>
        <View styles={styles.purchaserTextContainer}>
          {purchaserText}
          <Icon style={styles.arrowIcon} name="arrow-right" />
        </View>
      </TouchableHighlight>
    </View>
  );
});

AppRegistry.registerComponent('PurchaserPicker', () => PurchaserPicker);

export default PurchaserPicker;
