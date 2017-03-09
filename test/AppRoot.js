import React, { Component } from 'react';
import { BackAndroid, View } from 'react-native';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import RootNavigator from './RootNavigator';

/**
 * The applications root component.
 */
class AppRoot extends React.Component {
    // Invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    // Setting state in this method will trigger a re-rendering.
    componentDidMount() {
        // Subscribe to the hardware back button press event on TODO Android.
        BackAndroid.addEventListener('hardwareBackPress', () => {
            let {dispatch, rootNavigation} = this.props;
            // Close the drawer if necessary.
            if (rootNavigation.routes[rootNavigation.index].key === 'DrawerOpen') {
                dispatch({type: 'Navigate', routeName: 'DrawerClose'});
                return true;
            }
            return false;
        });
    }

    // The render function should be pure, meaning that it does not modify component state,
    // it returns the same result each time it's invoked, and it does not directly interact with the browser.
    // If you need to interact with the browser, perform your work in componentDidMount()
    // or the other lifecycle methods instead. Keeping render() pure makes components easier to think about.
    // You can also return null or false to indicate that you don't want anything rendered.
    // When returning null or false, ReactDOM.findDOMNode(this) will return null.
    render() {
        const {rootNavigation, dispatch} = this.props;
        // Are we authenticated?
        if (true) {
            // Render the root navigator.
            return (
                <RootNavigator navigation={addNavigationHelpers({
                dispatch: dispatch,
                state: rootNavigation
                })}/>
            );
        } else {
            // Render the login screen.
            return (
                <Login/>
            );
        }
    }
}

/**
 * Provide store properties to the component.
 */
const mapStateToProps = (state) => {
    return {
        rootNavigation: state.rootNavigation
    };
};

/**
 * Provide store actions to the component.
 */
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
