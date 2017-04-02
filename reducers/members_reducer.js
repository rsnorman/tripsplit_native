let initialMembersState = {
  tripMembers: [],
  isFetchingTripMembers: false,
  viewedMember: null,
  isFetchingMemberPayments: false,
  memberPayments: [],
  fetchMembersErrorMessage: null,
  fetchPaymentsErrorMessage: null
};

const members = (state = initialMembersState, action) => {
  switch (action.type) {
    case 'START_FETCHING_TRIP_MEMBERS':
      return {
        ...state,
        tripMembers: [],
        isFetchingTripMembers: true,
        fetchMembersErrorMessage: null
      };
    case 'TRIP_MEMBERS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingTripMembers: false,
        tripMembers: action.tripMembers
      };
    case 'FETCH_MEMBERS_ERROR':
      return {
        ...state,
        isFetchingTripMembers: false,
        fetchMembersErrorMessage: action.error
      };
    case 'VIEW_MEMBER':
      return {
        ...state,
        viewedMember: action.member
      };
    case 'START_FETCHING_MEMBER_PAYMENTS':
      return {
        ...state,
        memberPayments: [],
        isFetchingMemberPayments: true,
        fetchPaymentsErrorMessage: null
      };
    case 'MEMBER_PAYMENTS_FETCH_SUCCESS':
      return {
        ...state,
        isFetchingMemberPayments: false,
        memberPayments: action.memberPayments
      };
    case 'FETCH_PAYMENTS_ERROR':
      return {
        ...state,
        isFetchingMemberPayments: false,
        fetchPaymentsErrorMessage: action.error
      };
    default:
      return state;
  }
};

export default members;
