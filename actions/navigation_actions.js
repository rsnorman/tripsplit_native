export const openDrawer = () => {
  return {
    type: 'OPEN_DRAWER'
  };
};

export const closeDrawer = () => {
  return {
    type: 'CLOSE_DRAWER'
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

export const popTripStackScreen = () => {
  return {
    type: 'POP_TRIP_STACK_SCREEN'
  };
}

export const popSessionStackScreen = () => {
  return {
    type: 'POP_SESSION_STACK_SCREEN'
  };
}
