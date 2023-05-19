import { ActionTypes } from "./actions";
import { AppContextInterface, initialState } from "./appContext";

type Action = {
  type: ActionTypes;
  payload?: {
    user: object;
    token: string;
    location: string,
  };
  msg?: any
}

const reducer = (state: AppContextInterface, action: Action) => {
  if (action.type === ActionTypes.DISPLAY_ALERT) {
    return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!' }
  }
  if (action.type === ActionTypes.HIDE_ALERT) {
    return { ...state, showAlert: false, alertType: '', alertText: '' }
  }
  if (action.type === ActionTypes.REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === ActionTypes.REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.msg
    }
  }
  if (action.type === ActionTypes.REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload?.user,
      token: action.payload?.token,
      location: action.payload?.location,
      jobLocation: action.payload?.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting...'
    }
  }
  if (action.type === ActionTypes.LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true }
  }
  if (action.type === ActionTypes.LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.msg
    }
  }
  if (action.type === ActionTypes.LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      user: action.payload?.user,
      token: action.payload?.token,
      location: action.payload?.location,
      jobLocation: action.payload?.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Welcome! Redirecting...'
    }
  }
  if (action.type === ActionTypes.LOGOUT_USER) {
    return {
      ...initialState
    }
  }
  if (action.type === ActionTypes.TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar
    }
  }
  throw new Error(`no such action : ${action.type}`)
}

export default reducer;
