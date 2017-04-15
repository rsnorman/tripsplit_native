
export const selectPurchaser = (purchaser, onPurchaserSelected) => {
  onPurchaserSelected(purchaser.id);
  return {
    type: 'SELECT_PURCHASER',
    purchaser
  }
}

export const viewPurchasers = (selectedPurchaserId, onPurchaserSelected) => {
  return {
    type: 'VIEW_PURCHASERS',
    onPurchaserSelected,
    selectedPurchaserId
  }
}

export const cancelPurchasersSelect = () => {
  return {
    type: 'CANCEL_VIEW_PURCHASERS'
  }
}
