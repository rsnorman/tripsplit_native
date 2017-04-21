// @flow

import { isInvalidForm } from './../../helpers/form-validation';

let initialMembersState = {
  tripMembers: [],
  isFetchingTripMembers: false,
  viewedMember: null,
  isFetchingMemberPayments: false,
  memberPayments: [],
  fetchMembersErrorMessage: null,
  fetchPaymentsErrorMessage: null,
  isViewingNewMemberForm: false,
  showTripJoinUrlCopiedMessage: false,
  newMember: {
    name: null,
    email: null
  },
  isSavingMember: false
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
    case 'NEW_MEMBER':
      let newTripMember = {
        trip: action.trip,
        name: null,
        email: null
      };
      return {
        ...state,
        newMember: newTripMember,
        isViewingNewMemberForm: true,
        showTripJoinUrlCopiedMessage: false
      };
    case 'SET_NEW_MEMBER_ATTRIBUTE':
      let newMember = {...state.newMember};
      newMember[action.name] = action.value;

      return {
        ...state,
        newMember,
        isValidMember: !isInvalidForm(newMember, ['name', 'email'])
      };
    case 'START_CREATING_MEMBER':
      return {
        ...state,
        isSavingMember: true,
        errorMessage: null
      };
    case 'MEMBER_CREATE_SUCCESS':
      return {
        ...state,
        tripMembers: [...state.tripMembers, action.member],
        isSavingMember: false,
        isViewingNewMemberForm: false,
        viewedMember: action.member
      };
    case 'SAVE_MEMBER_ERROR':
      return {
        ...state,
        isSavingMember: false,
        errorMessage: action.error
      };
    case 'CANCEL_ADDING_MEMBER':
      return {
        ...state,
        isViewingNewMemberForm: false
      };
    default:
      return state;
  }
};

export default members;
