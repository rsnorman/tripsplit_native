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
    case 'DESTROY_SESSION':
      return Object.assign({}, state, {
        session: null
      });
    case 'START_UPDATING_USER_IMAGE':
      return {
        ...state,
        isUploadingUserImage: true
      };
    case 'USER_IMAGE_UPDATE_SUCCESS':
      return {
        ...state,
        user: action.user,
        isUploadingUserImage: false
      };
    default:
      return state;
  }
};

export default session;
