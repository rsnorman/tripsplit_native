import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { AppRegistry, TouchableHighlight, Text, View, StyleSheet, Platform } from 'react-native';
import { viewPurchasers } from '../actions/purchasers_picker_actions';
import { primaryColor, secondaryColor } from './../constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import formStyles from '../styles/form';
const pickerInput = Platform.OS === 'ios' ? {
  height: 36,
  padding: 4,
  flex: 4,
  borderWidth: 1,
  borderColor: primaryColor,
  borderRadius: 8
} : {
  height: 36,
  padding: 4,
  flex: 4,
  borderBottomWidth: 1,
  borderColor: secondaryColor
};

const styles = StyleSheet.create({
  ...formStyles,
  pickerInput,
  pickerText: {
    fontSize: 18,
    color: primaryColor
  },
  pickerPlaceholderText: {
    fontSize: 18,
    color: Platform.OS === 'ios' ? '#B6B6BB' : '#6B6B6E'
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
    onBeginPickingPurchasers: (expense, onSelect) => {
      dispatch(viewPurchasers(expense, onSelect));
    }
  };
};

const PurchaserPicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ purchasers, selectedPurchaserId, onBeginPickingPurchasers, onPurchaserSelected }) => {
  if (!purchasers || purchasers.length == 0) {
    return <View />;
  }

  function getPurchaserName(purchasers, purchaserId) {
    return purchasers.filter((purchaser) => {
      return purchaser.id === purchaserId;
    }).map((purchaser) => purchaser.name)[0];
  }

  function onSelect(purchaser) {
    onPurchaserSelected(purchaser);
  }

  const purchaser = getPurchaserName(purchasers, selectedPurchaserId);
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
        style={styles.pickerInput}
        color={primaryColor}
        underlayColor="transparent"
        onPress={() => onBeginPickingPurchasers(selectedPurchaserId, onSelect)}>
        <View styles={styles.purchaserTextContainer}>
          {purchaserText}
          <Icon style={styles.arrowIcon} name="arrow-right" />
        </View>
      </TouchableHighlight>
    </View>
  );
});

PurchaserPicker.propTypes = {
  selectedPurchaserId: PropTypes.number,
  onPurchaserSelected: PropTypes.func.isRequired
};

AppRegistry.registerComponent('PurchaserPicker', () => PurchaserPicker);

export default PurchaserPicker;
