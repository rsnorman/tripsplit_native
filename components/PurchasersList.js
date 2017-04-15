import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Button,
  ListView,
  AppRegistry
} from 'react-native';

import ListImage from './../components/ListImage';
import CancelPurchaserSelectButton from './../containers/CancelPurchaserSelectButton';

import Icon from 'react-native-vector-icons/FontAwesome';

import { primaryColor } from './../constants';

let styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  name: {
    fontSize: 18
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  selectedIcon: {
    fontSize: 18,
    color: primaryColor,
    position: 'absolute',
    right: 10,
    top: 15
  }
});

class PurchasersList extends Component {
  static navigationOptions = {
    title: 'Choose Purchaser',
    header: () => ({
      left: <CancelPurchaserSelectButton />,
      tintColor: primaryColor,
      titleStyle: { color: 'black' }
    })
  };

  rowPressed(purchaserId) {
    let purchaser = this.props.purchasers.filter(purchaser => purchaser.id === purchaserId)[0];
    this.props.onPurchaserSelected(purchaser);
  }

  renderRow(rowData, _sectionID, _rowID) {
    const { selectedPurchaser } = this.props;
    const selectedIcon = selectedPurchaser.id === rowData.id ?
      (
        <Icon style={styles.selectedIcon} name="check-circle-o" />
      ) : ( <View /> );
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <ListImage size={30} image={rowData.picture} icon='user' />
            <View style={styles.textContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {rowData.name}
              </Text>
            </View>
            {selectedIcon}
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { dataSource } = this.props;
    return (
      <ListView
        dataSource={dataSource}
        enableEmptySections={true}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
}

AppRegistry.registerComponent('PurchasersList', () => PurchasersList);

export default PurchasersList;
