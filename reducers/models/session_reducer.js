const defaultUser = {
  email: null,
  password: null,
  isInitializing: true,
  isLoggingIn: false,
  errorMessage: null,
  validSignIn: false
};

import { isInvalidForm } from './../../helpers/form-validation';

const session = (state = defaultUser, action) => {
  switch (action.type) {
    case 'APP_INITIALIZED':
      return {
        ...state,
        isInitializing: false
      };
    case 'SAVED_SESSION_DATA_LOADED':
      return {
        ...state,
        session: action.sessionData.session,
        email: action.sessionData.user.email
      };
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.email,
        validSignIn: !isInvalidForm({...state, email: action.email}, ['email', 'password'])
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.password,
        validSignIn: !isInvalidForm({...state, password: action.password}, ['email', 'password'])
      };
    case 'START_LOGIN':
      return {
        ...state,
        isLoggingIn: true,
        errorMessage: null,
      }
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        session: action.session
      }
    case 'CREATE_SESSION':
      return {
        ...state,
        isLoggingIn: false,
        session: action.session
      };
    case 'DESTROY_SESSION':
      return {
        ...state,
        session: null,
        password: null,
      };
    case 'CREATE_SESSION_ERROR':
      return {
        ...state,
        isLoggingIn: false,
        errorMessage: action.error
      };
    case 'USER_DELETE_SUCCESS':
      return {
        ...state,
        session: null,
        password: null,
      };
    case 'UNAUTHORIZED':
      return {
        ...state,
        session: null,
        password: null
      };
    default:
      return state;
  }
};

export default session;
