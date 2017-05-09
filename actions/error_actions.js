// @flow

function createError(error: string, type: string) {
  if (error === 'Unauthorized') {
    return {
      type: 'UNAUTHORIZED'
    };
  } else {
    return {
      type,
      error
    };
  }
}

export const tripsFetchFailure = (error: string) => {
  return createError(error, 'FETCH_TRIPS_ERROR');
}

export const tripRefreshFailure = (error: string) => {
  return createError(error, 'REFRESH_TRIP_ERROR');
}

export const expensesFetchFailure = (error: string) => {
  return createError(error, 'FETCH_EXPENSES_ERROR');
}

export const membersFetchFailure = (error: string) => {
  return createError(error, 'FETCH_MEMBERS_ERROR');
}

export const paymentsFetchFailure = (error: string) => {
  return createError(error, 'FETCH_PAYMENTS_ERROR');
}

export const obligationsFetchFailure = (error: string) => {
  return createError(error, 'FETCH_OBLIGATIONS_ERROR');
}

export const tripSaveFailure = (error: string) => {
  return createError(error, 'SAVE_TRIP_ERROR');
}

export const expenseSaveFailure = (error: string) => {
  return createError(error, 'SAVE_EXPENSE_ERROR');
}

export const expenseObligationPaymentFailure = (error: string) => {
  return createError(error, 'PAY_EXPENSE_OBLIGATION_ERROR');
}

export const expenseObligationPaymentRemoveFailure = (error: string) => {
  return createError(error, 'EXPENSE_OBLIGATION_PAYMENT_REMOVAL_ERROR');
}

export const expenseObligationAnnulFailure = (error: string) => {
  return createError(error, 'EXPENSE_OBLIGATION_ANNULMENT_ERROR');
}

export const expenseObligationActivateFailure = (error: string) => {
  return createError(error, 'EXPENSE_OBLIGATION_ACTIVATE_ERROR');
}

export const tripDeleteFailure = (error: string) => {
  return createError(error, 'DELETE_TRIP_ERROR');
}

export const expenseDeleteFailure = (error: string) => {
  return createError(error, 'DELETE_EXPENSE_ERROR');
}

export const userUpdateFailure = (error: string) => {
  return createError(error, 'UPDATE_USER_ERROR');
}

export const userPasswordChangeFailure = (error: string) => {
  return createError(error, 'CHANGE_USER_PASSWORD_ERROR');
}

export const userPhotoUpdateFailure = (error: string) => {
  return createError(error, 'UPDATE_USER_PHOTO_ERROR');
}

export const tripPhotoUpdateFailure = (error: string) => {
  return createError(error, 'UPDATE_TRIP_PHOTO_ERROR');
}

export const expensePhotoUpdateFailure = (error: string) => {
  return createError(error, 'UPDATE_EXPENSE_PHOTO_ERROR');
}

export const memberPhotoUpdateFailure = (error: string) => {
  return createError(error, 'UPDATE_MEMBER_PHOTO_ERROR');
}

export const tripMemberSaveFailure = (error: string) => {
  return createError(error, 'SAVE_MEMBER_ERROR');
}

export const userDeleteFailure = (error: string) => {
  return createError(error, 'DELETE_USER_ERROR');
}

export const memberDeleteFailure = (error: string) => {
  return createError(error, 'DELETE_MEMBER_ERROR');
}

export const userRefreshFailure = (error: string) => {
  return createError(error, 'REFRESH_USER_ERROR');
}
