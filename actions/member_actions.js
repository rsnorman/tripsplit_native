import { applyAuthenticationHeaders } from './helpers';

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
      .then(response => response.json())
      .then(json => dispatch(tripMembersFetchSuccess(json)))
      .catch(error => console.log(error))
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
  let url = `http://localhost:3000/users/${user.id}/payments?trip_id=${trip.id}`;

  return dispatch => {
    const { session } = dispatch(startFetchingMemberPayments())
    return fetch(url, applyAuthenticationHeaders({
      method: 'GET'
    }, session))
      .then(response => response.json())
      .then(json => dispatch(memberPaymentsFetchSuccess(json)))
      .catch(error => console.log(error))
  }
}
