/**
 * Import external dependencies.
 */
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {connect} from 'react-redux';

/**
 * Import local dependencies.
 */
// import {pingCreators, isPinging} from '../../redux/reducers/ping';

/**
 * Import styles.
 */
// import styles from './styles';

/**
 * The component.
 */
class NotificationsList extends Component {
    render() {
        return (
            <View>
                <Text>Notifications List</Text>
            </View>
        )
    }
}

/**
 * Provide store properties to the component.
 */
const mapStateToProps = (state) => {
    return {
        notifications: []
    }
};

/**
 * Provide store actions to the component.
 */
const mapDispatchToProps = (dispatch) => ({
    onNotificationSelected: () => {
      console.log('notification selected');
      // dispatch(pingCreators.ping())
    }
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList)
