/**
 * Bernd Wessels (https://github.com/BerndWessels/)
 *
 * Copyright © 2016 Bernd Wessels. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 *
 * @flow
 */

'use strict';

/**
 * Import external dependencies.
 */
import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';

/**
 * Import local dependencies.
 */
import NotificationDetails from './NotificationDetails';
import NotificationsList from './NotificationsList';

/**
 * Import styles.
 */
//import styles from './styles';

const NotificationsNavigator = StackNavigator({
    NotificationList: {
        screen: NotificationsList
    },
    NotificationDetails: {
        screen: NotificationDetails
    }
}, {
    headerMode: 'screen',
    navigationOptions: {
        title: 'my notifications'
    }
});

/**
 * The component.       //// TODO TODO TODO !!!!!!!!!!!!!! This might need its own reducer !!!???!!!??? !!!!!!!!!!!!!!!!!!!!!!!!!!
 */
class NotificationsContainer extends Component {
    // static navigationOptions = {
    //     // Title may be a simple string:
    //     title: 'notification',
    //     header: {
    //         right: <Button title="Info" onPress={()=>console.log('press')} />,
    //     },
    // };
    render() {
        return (
            <NotificationsNavigator/>
        )
    }
}

/**
 * Provide store properties to the component.
 */
const mapStateToProps = (state) => {
    return {
    }
};

/**
 * Provide store actions to the component.
 */
const mapDispatchToProps = (dispatch) => ({
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer)
