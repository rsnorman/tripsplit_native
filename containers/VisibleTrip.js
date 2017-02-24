import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { } from '../actions';
import TripView from './../components/TripView'

const mapStateToProps = (state) => {
  return {
    session: state.session.session,
    isViewingNewExpenseForm: false,
    isFetchingExpenses: true
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddExpensePressed: () => {
      
    }
  };
};

const VisibleTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripView);

AppRegistry.registerComponent('VisibleTrip', () => VisibleTrip);

export default VisibleTrip;
