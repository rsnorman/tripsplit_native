const defaultUser = {
  email: null,
  password: null,
  isInitializing: true,
  isLoggingIn: false,
  errorMessage: null,
  loginButtonDisabled: true
};

function isInvalidForm(state, fields) {
  let _i, _len, _field;

  for (_i = 0, _len = fields.length; _i < _len; _i++) {
    _field = fields[_i];
    if (!state[_field] || state[_field] === '') {
      return true;
    }
  }

  return false;
}

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
        loginButtonDisabled: isInvalidForm({...state, email: action.email}, ['email', 'password'])
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.password,
        loginButtonDisabled: isInvalidForm({...state, password: action.password}, ['email', 'password'])
      };
    case 'START_LOGIN':
      return {
        ...state,
        isLoggingIn: true,
        errorMessage: null,
        loginButtonDisabled: isInvalidForm(state, ['email', 'password'])
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
        loginButtonDisabled: false
      };
    case 'CREATE_SESSION_ERROR':
      return {
        ...state,
        isLoggingIn: false,
        loginButtonDisabled: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default session;
