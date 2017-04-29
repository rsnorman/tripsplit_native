const confirmPopup = (state = {showPopup: false, confirmCallback: () => {}, cancelCallback: () => {}}, action) => {
  switch (action.type) {
    case 'CONFIRM_ACTION':
      return {
        ...state,
        showPopup: true,
        title: action.title,
        message: action.message,
        confirmCallback: action.confirmCallback,
        cancelCallback: action.cancelCallback
      };
    case 'HIDE_CONFIRM_POPUP':
      return {
        ...state,
        showPopup: false,
        title: null,
        message: null,
        confirmCallback: () => {},
        cancelCallback: () => {}
      }
    default:
      return state;
  }
};

export default confirmPopup;
