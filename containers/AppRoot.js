import React, { Component } from 'react';
import { BackAndroid, View, ActivityIndicator, StyleSheet } from 'react-native';
import { DrawerNavigator, addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import RootNavigator from './../components/RootNavigator';
import CurrentSessionStackNavigator from '../containers/CurrentSessionStackNavigator';
import { initializeHomeScreen } from '../actions/initialize_actions';

var styles = StyleSheet.create({
  appInitializingContainer: {
    paddingTop: 100
  }
})
/**
 * The applications root component.
 */
class AppRoot extends React.Component {
    // Invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
    // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    // Setting state in this method will trigger a re-rendering.
    componentDidMount() {
      this.props.onLoad();

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
        const {navigation, session, isInitializing, dispatch} = this.props;

        if (!!session) {
            return (
                <RootNavigator navigation={addNavigationHelpers({
                    dispatch: dispatch,
                    state: navigation
                })}/>
            );
        } else if (isInitializing) {
          return (
            <View style={styles.appInitializingContainer}>
              <ActivityIndicator size="large" />
            </View>
          )
        } else {
            // Render the login screen.
            return (
                <CurrentSessionStackNavigator/>
            );
        }
    }
}

/**
 * Provide store properties to the component.
 */
const mapStateToProps = (state) => {
    return {
        navigation: state.rootNavigation,
        session: state.session.session,
        isInitializing: state.session.isInitializing
    };
};

/**
 * Provide store actions to the component.
 */
const mapDispatchToProps = (dispatch) => ({
    dispatch: dispatch,
    onLoad: () => {
      dispatch(initializeHomeScreen());
    }
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
