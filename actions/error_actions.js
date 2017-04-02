// @flow

export const tripsFetchFailure = (error: string) => {
  return {
    type: 'FETCH_TRIPS_ERROR',
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
