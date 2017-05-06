import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, BackHandler } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import RootNavigator from './../components/RootNavigator';
import CurrentSessionStackNavigator from '../containers/CurrentSessionStackNavigator';
import { initializeHomeScreen } from '../actions/initialize_actions';
import { closeDrawer } from '../actions/navigation_actions';
import { secondaryColor } from './../constants';

var styles = StyleSheet.create({
  appInitializingContainer: {
    paddingTop: 100
  }
})

class AppRoot extends React.Component {
    componentDidMount() {
      this.props.onLoad();

      BackHandler.addEventListener('hardwareBackPress', () => {
        this.props.onBackButtonPress();
        return true;
      });
    }

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
              <ActivityIndicator size="large" color={secondaryColor} />
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
    },
    onBackButtonPress: () => {
      dispatch(closeDrawer());
    }
});

/**
 * Connect the component to the store and export it.
 */
export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
