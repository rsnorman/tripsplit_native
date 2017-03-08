const tripTabs = (state = {activeTabIndex: 0}, action) => {
  switch (action.type) {
    case 'SELECT_TRIP_TAB':
      return {
        ...state,
        activeTabIndex: action.tabIndex
      };
    default:
      return state;
  }
};

export default tripTabs;
