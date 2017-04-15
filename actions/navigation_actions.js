export const openDrawer = () => {
  return {
    type: 'OPEN_DRAWER'
  };
};

export const viewRegistration = () => {
  return {
    type: 'VIEW_REGISTRATION'
  };
}

export const viewLogin = () => {
  return {
    type: 'VIEW_LOGIN'
  };
}

export const viewPurchasers = (expense) => {
  return {
    type: 'VIEW_PURCHASERS',
    expense: expense
  }
}

export const cancelPurchasersSelect = () => {
  return {
    type: 'CANCEL_VIEW_PURCHASERS'
  }
}
