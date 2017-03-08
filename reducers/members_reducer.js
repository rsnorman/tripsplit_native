let initialMembersState = {
  tripMembers: [],
  isFetchingTripMembers: false,
  viewedMember: null,
};

const members = (state = initialMembersState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIP_MEMBERS':
      return Object.assign({}, state, {
        isFetchingTripMembers: true
      })
    case 'TRIP_MEMBERS_FETCH_SUCCESS':
      return Object.assign({}, state, {
        isFetchingTripMembers: false,
        tripMembers: action.tripMembers
      });
    case 'VIEW_MEMBER':
      return Object.assign({}, state, {
        viewedMember: action.member
      });
    default:
      return state;
  }
};

export default members;
