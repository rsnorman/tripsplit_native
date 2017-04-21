const purchasersPicker = (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_PURCHASERS':
      return {
        ...state,
        onPurchaserSelected: action.onPurchaserSelected,
        selectedPurchaserId: action.selectedPurchaserId
      };
    case 'CANCEL_VIEW_PURCHASERS':
    case 'SELECT_PURCHASER':
      return {
        ...state,
        onPurchaserSelected: () => {}
      }
    default:
      return state;
  }
};

export default purchasersPicker;
