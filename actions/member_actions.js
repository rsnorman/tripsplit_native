import { applyAuthenticationHeaders, parseResponse } from './helpers';
import { membersFetchFailure, paymentsFetchFailure } from './error_actions';

function startFetchingTripMembers() {
  return {
    type: 'START_FETCHING_TRIP_MEMBERS'
  }
}

function tripMembersFetchSuccess(members) {
  return {
    type: 'TRIP_MEMBERS_FETCH_SUCCESS',
    tripMembers: members
  }
}

export const fetchTripMembers = (trip) => {
  return dispatch => {
    const { session } = dispatch(startFetchingTripMembers());
    const { url, method } = trip.actions.view_members;

    return fetch(url, applyAuthenticationHeaders({
      method: method
    }, session))
      .then(parseResponse(200, 'There was an error retrieving members. Please try again.'))
      .then(json => dispatch(tripMembersFetchSuccess(json)))
      .catch(error => dispatch(membersFetchFailure(error)))
  }
}

export const viewMember = (member) => {
  return {
    type: 'VIEW_MEMBER',
    member
  }
}

function startFetchingMemberPayments() {
  return {
    type: 'START_FETCHING_MEMBER_PAYMENTS'
  }
}

function memberPaymentsFetchSuccess(payments) {
  return {
    type: 'MEMBER_PAYMENTS_FETCH_SUCCESS',
    memberPayments: payments
  }
}

export const fetchMemberPayments = (trip, user) => {
  return dispatch => {
    const { session } = dispatch(startFetchingMemberPayments())
    const { url, method } = user.actions.view_payments;

    return fetch(url, applyAuthenticationHeaders({
      method: method
    }, session))
      .then(parseResponse(200, 'There was an error retrieving member payments. Please try again.'))
      .then(json => dispatch(memberPaymentsFetchSuccess(json)))
      .catch(error => dispatch(paymentsFetchFailure(error)))
  }
}
