const defaultUser = {
  email: 'rsnorman15@gmail.com',
  password: 'test1234',
  isInitializing: true
};

const session = (state = defaultUser, action) => {
  switch (action.type) {
    case 'APP_INITIALIZED':
      console.log('reduce app initialized', action.sessionData);
      if (!action.sessionData) {
        return {
          ...state,
          isInitializing: false
        };
      }
      return {
        ...state,
        isInitializing: false,
        user: action.sessionData.user,
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
        user: action.user,
        session: action.session
      });
    default:
      return state;
  }
};

export default session;
