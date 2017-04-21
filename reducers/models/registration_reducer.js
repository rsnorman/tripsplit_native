const newUser = {
  name: '',
  email: '',
  password: '',
  isRegistering: false,
  errorMessage: null,
  validUser: false
};

import { isInvalidForm } from './../../helpers/form-validation';

const registration = (state = newUser, action) => {
  switch (action.type) {
    case 'SET_ACCOUNT_NAME':
      return {
        ...state,
        name: action.name,
        validUser: !isInvalidForm({...state, name: action.name}, ['name', 'email', 'password'])
      };
    case 'SET_ACCOUNT_EMAIL':
      return {
        ...state,
        email: action.email,
        validUser: !isInvalidForm({...state, email: action.email}, ['name', 'email', 'password'])
      };
    case 'SET_ACCOUNT_PASSWORD':
      return {
        ...state,
        password: action.password,
        validUser: !isInvalidForm({...state, password: action.password}, ['name', 'email', 'password'])
      };
    case 'START_REGISTERING':
      return {
        ...state,
        isRegistering: true,
        errorMessage: null,
      }
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        isRegistering: false
      };
    case 'CREATE_ACCOUNT_ERROR':
      return {
        ...state,
        isRegistering: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default registration;
