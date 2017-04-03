const initialUserState = {
  user: {},
  editingUser: null,
  isViewingEditUserForm: false,
  isUploadingUserImage: false,
  errorMessage: null
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SAVED_SESSION_DATA_LOADED':
      return {
        ...state,
        user: action.sessionData.user
      };
    case 'CREATE_SESSION':
      return {
        ...state,
        user: action.user
      };
    case 'DESTROY_SESSION':
      return {
        ...state,
        user: null
      };
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
    case 'EDIT_USER':
      return {
        ...state,
        editingUser: action.user,
        isViewingEditUserForm: true,
        errorMessage: null
      };
    case 'SET_USER_ATTRIBUTE':
      let editingUser = {
        ...state.editingUser
      };
      editingUser[action.name] = action.value;

      return {
        ...state,
        editingUser
      };
    case 'START_UPDATING_USER':
      return {
        ...state,
        isSavingUser: true,
        errorMessage: action.error
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        user: action.user,
        viewedUser: action.user,
        isSavingUser: false,
        isViewingEditUserForm: false
      };
    case 'UPDATE_USER_ERROR':
      return {
        ...state,
        isSavingUser: false,
        errorMessage: action.error
      };
    case 'CANCEL_EDIT_USER':
      return {
        ...state,
        isViewingEditUserForm: false
      }
    default:
      return state;
  }
};

export default user;
