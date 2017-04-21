import { isInvalidForm } from './../../helpers/form-validation';

const initialUserState = {
  user: {},
  editingUser: null,
  isViewingEditUserForm: false,
  isUploadingUserImage: false,
  errorMessage: null,
  uploadPhotoErrorMessage: null,
  isValidUser: false,
  changedPasswordData: {},
  isViewingChangeUserPasswordForm: false,
  changePasswordErrorMessage: null,
  isValidUserPasswordChange: false,
  isDeletingUser: false
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SAVED_SESSION_DATA_LOADED':
      return {
        ...state,
        user: action.sessionData.user
      };
    case 'CREATE_ACCOUNT':
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
        isUploadingUserImage: true,
        uploadPhotoErrorMessage: null
      };
    case 'USER_IMAGE_UPDATE_SUCCESS':
      return {
        ...state,
        user: action.user,
        isUploadingUserImage: false
      };
    case 'UPDATE_USER_PHOTO_ERROR':
      return {
        ...state,
        isUploadingUserImage: false,
        uploadPhotoErrorMessage: action.error
      };
    case 'EDIT_USER':
      return {
        ...state,
        editingUser: action.user,
        isViewingEditUserForm: true,
        errorMessage: null,
        isValidUser: false
      };
    case 'SET_USER_ATTRIBUTE':
      let editingUser = {
        ...state.editingUser
      };
      editingUser[action.name] = action.value;

      return {
        ...state,
        editingUser,
        isValidUser: !isInvalidForm(editingUser, ['name', 'email'])
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
    case 'EDIT_USER_PASSWORD':
      return {
        ...state,
        editingUser: state.user,
        changedPasswordData: {},
        isViewingChangeUserPasswordForm: true,
        changePasswordErrorMessage: null,
        isValidUserPasswordChange: false
      };
    case 'SET_USER_PASSWORD_ATTRIBUTE':
      let changedPasswordData = {
        ...state.changedPasswordData
      };
      changedPasswordData[action.name] = action.value;

      return {
        ...state,
        changedPasswordData,
        isValidUserPasswordChange: !isInvalidForm(changedPasswordData, ['currentPassword', 'password', 'passwordConfirmation'])
      };
    case 'START_CHANGING_USER_PASSWORD':
      return {
        ...state,
        isChangingUserPassword: true,
        isValidUserPasswordChange: null
      };
    case 'USER_PASSWORD_CHANGE_SUCCESS':
      return {
        ...state,
        changedPasswordData: {},
        isChangingUserPassword: false,
        isViewingChangeUserPasswordForm: false
      };
    case 'CHANGE_USER_PASSWORD_ERROR':
      return {
        ...state,
        isChangingUserPassword: false,
        changePasswordErrorMessage: action.error
      };
    case 'CANCEL_EDITING_USER_PASSWORD':
      return {
        ...state,
        isViewingChangeUserPasswordForm: false
      }
    case 'START_DELETING_USER':
      return {
        ...state,
        errorMessage: null,
        isDeletingUser: true
      };
    case 'USER_DELETE_SUCCESS':
      return {
        ...state,
        user: {},
        isDeletingUser: false,
        isViewingEditUserForm: false
      };
    case 'DELETE_USER_ERROR':
      return {
        ...state,
        isDeletingUser: false,
        errorMessage: action.error
      };
    case 'USER_REFRESH_SUCCESS':
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default user;
