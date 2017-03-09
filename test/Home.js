/**
 * Import external dependencies.
 */
import React, {Component} from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

/**
 * Import local dependencies.
 */
// import {pingCreators, isPinging} from '../../redux/reducers/ping';

/**
 * Import styles.
 */
// import styles from './styles';

let styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    marginTop: 25
  }
})

/**
 * The component.
 */
class HomeContainer extends Component {
    render() {
        const {isPinging, ping} = this.props;
        return (
            <View style={styles.container}>
                <Text>Welcome Home</Text>
                <Text>{JSON.stringify(isPinging)}</Text>
                <Button onPress={()=>{ping();}} title="ping"/>
            </View>
        )
    }
}

/**
 * Provide store properties to the component.
 */
const mapStateToProps = (state) => {
    return {
        isPinging: true
    }
};

/**
 * Provide store actions to the component.
 */
const mapDispatchToProps = (dispatch) => ({
    ping: () => {
      console.log('ping check');
      // dispatch(pingCreators.ping())
    }
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)
