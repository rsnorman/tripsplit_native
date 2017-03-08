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
  let url = 'http://localhost:3000/trips/' + trip.id + '/members';

  return dispatch => {
    const { session } = dispatch(startFetchingTripMembers())
    return fetch(url, applyAuthenticationHeaders({
      method: 'GET'
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
