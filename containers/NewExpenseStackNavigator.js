import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import NewExpenseFormStackNavigator from '../components/NewExpenseFormStackNavigator';
import NewExpense from '../containers/NewExpense';

const NewExpenseStackNavigator = connect(state => ({
  nav: state.newExpenseFormNav
}))(({ dispatch, nav }) => {
  return (
    <NewExpenseFormStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('NewExpenseStackNavigator', () => NewExpenseStackNavigator);

export default NewExpenseStackNavigator;
