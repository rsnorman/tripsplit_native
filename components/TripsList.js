'use strict';

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text,
  ActivityIndicator
} from 'react-native';

let styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48bbec'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

class TripsList extends Component {
  static navigationOptions = {
    title: 'Results',
  };

  constructor(props) {
    super(props);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    console.log(props.trips);
    this.state = {
      dataSource: dataSource.cloneWithRows(props.trips)
    };
  }

  rowPressed(tripId) {
    // let property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];
    // this.props.onPropertySelected(property);
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData.id)}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.price}>{rowData.id}</Text>
              <Text style={styles.title} numberOfLines={1}>
                {rowData.name}
              </Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.isFetchingTrips) {
      return <ActivityIndicator size='large'/>
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
     );
  }
}

TripsList.propTypes = {
  trips: PropTypes.array.isRequired
};

export default TripsList;
