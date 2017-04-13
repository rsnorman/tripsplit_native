// @flow

export const tripsFetchFailure = (error: string) => {
  return {
    type: 'FETCH_TRIPS_ERROR',
    error
  }
}

export const tripRefreshFailure = (error: string) => {
  return {
    type: 'REFRESH_TRIP_ERROR',
    error
  }
}

export const expensesFetchFailure = (error: string) => {
  return {
    type: 'FETCH_EXPENSES_ERROR',
    error
  }
}

export const membersFetchFailure = (error: string) => {
  return {
    type: 'FETCH_MEMBERS_ERROR',
    error
  }
}

export const paymentsFetchFailure = (error: string) => {
  return {
    type: 'FETCH_PAYMENTS_ERROR',
    error
  }
}

export const obligationsFetchFailure = (error: string) => {
  return {
    type: 'FETCH_OBLIGATIONS_ERROR',
    error
  }
}

export const tripSaveFailure = (error: string) => {
  return {
    type: 'SAVE_TRIP_ERROR',
    error
  };
}

export const expenseSaveFailure = (error: string) => {
  return {
    type: 'SAVE_EXPENSE_ERROR',
    error
  };
}

export const expenseObligationPaymentFailure = (error: string) => {
  return {
    type: 'PAY_EXPENSE_OBLIGATION_ERROR',
    error
  };
}

export const tripDeleteFailure = (error: string) => {
  return {
    type: 'DELETE_TRIP_ERROR',
    error
  };
}

export const expenseDeleteFailure = (error: string) => {
  return {
    type: 'DELETE_EXPENSE_ERROR',
    error
  };
}

export const userUpdateFailure = (error: string) => {
  return {
    type: 'UPDATE_USER_ERROR',
    error
  }
}

export const userPhotoUpdateFailure = (error: string) => {
  return {
    type: 'UPDATE_USER_PHOTO_ERROR',
    error
  }
}

export const tripPhotoUpdateFailure = (error: string) => {
  return {
    type: 'UPDATE_TRIP_PHOTO_ERROR',
    error
  }
}

export const expensePhotoUpdateFailure = (error: string) => {
  return {
    type: 'UPDATE_EXPENSE_PHOTO_ERROR',
    error
  }
}

export const tripMemberSaveFailure = (error: string) => {
  return {
    type: 'SAVE_MEMBER_ERROR',
    error
  };
}
