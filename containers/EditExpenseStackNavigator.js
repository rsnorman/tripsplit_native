import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import EditExpenseFormStackNavigator from '../components/EditExpenseFormStackNavigator';
import EditExpense from '../containers/EditExpense';

const EditExpenseStackNavigator = connect(state => ({
  nav: state.editExpenseFormNav
}))(({ dispatch, nav }) => {
  return (
    <EditExpenseFormStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('EditExpenseStackNavigator', () => EditExpenseStackNavigator);

export default EditExpenseStackNavigator;
