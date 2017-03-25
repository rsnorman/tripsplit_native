let initialMembersState = {
  tripMembers: [],
  isFetchingTripMembers: false,
  viewedMember: null,
  isFetchingMemberPayments: false,
  memberPayments: []
};

const members = (state = initialMembersState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIP_MEMBERS':
      return {
        ...state,
        isFetchingTripMembers: true
      };
    case 'TRIP_MEMBERS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTripMembers: false,
        tripMembers: action.tripMembers
      };
    case 'VIEW_MEMBER':
      return {
        ...state,
        viewedMember: action.member
      };
    case 'START_FETCHING_MEMBER_PAYMENTS':
      return {
        ...state,
        isFetchingMemberPayments: true
      };
    case 'MEMBER_PAYMENTS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingMemberPayments: false,
        memberPayments: action.memberPayments
      };
    default:
      return state;
  }
};

export default members;
