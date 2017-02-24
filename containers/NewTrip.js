import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { setTripAttr, createTrip } from '../actions/trip';
import NewTripForm from '../components/NewTripForm'

const mapStateToProps = (state) => {
  return {
    newTrip: state.trips.newTrip,
    isCreatingTrip: state.trips.isCreatingTrip,
    session: state.session.session
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTripAttributeSet: (attributeName, attributeValue) => {
      dispatch(setTripAttr(attributeName, attributeValue));
    },
    onCreate: (session, newTrip) => {
      dispatch(createTrip(session, newTrip));
    }
  };
};

const NewTrip = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTripForm);

AppRegistry.registerComponent('NewTrip', () => NewTrip);

export default NewTrip;
