import React from 'react';
import { connect } from 'react-redux';
import { AppRegistry } from 'react-native';
import { addNavigationHelpers } from  'react-navigation';
import ExpenseFormStackNavigator from '../components/ExpenseFormStackNavigator';

const NewExpenseStackNavigator = connect(state => ({
  nav: state.expenseFormNav
}))(({ dispatch, nav }) => {
  return (
    <ExpenseFormStackNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  );
});

AppRegistry.registerComponent('NewExpenseStackNavigator', () => NewExpenseStackNavigator);

export default NewExpenseStackNavigator;
