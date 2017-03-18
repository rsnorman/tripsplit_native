const defaultUser = {
  email: 'rsnorman15@gmail.com',
  password: 'test1234',
  isInitializing: true
};

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
        session: action.sessionData.session
      };
    case 'SET_EMAIL':
      return Object.assign({}, state, {
        email: action.email
      });
    case 'SET_PASSWORD':
      return Object.assign({}, state, {
        password: action.password,
      });
    case 'START_LOGIN':
      return Object.assign({}, state, {
        isLoggingIn: true
      })
    case 'CREATE_SESSION':
      return Object.assign({}, state, {
        isLoggingIn: false,
        session: action.session
      });
    case 'DESTROY_SESSION':
      return Object.assign({}, state, {
        session: null
      });
    default:
      return state;
  }
};

export default session;
