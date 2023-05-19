import { useReducer, useContext, createContext } from "react";
import { ActionTypes } from "./actions";

import reducer from "./reducer";

export type ChildrenPropType = {
  children: React.ReactNode; //👈 children prop type
};

export interface AppContextInterface {
  alertText: string;
  alertType: string;
  isLoading: boolean;
  showAlert: boolean;
  showSidebar: boolean;
  setShowLogout: boolean

  user?: object | null;
  token?: string | null;
  userLocation?: string | null;
  jobLocation?: string | null;
}

const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
const userLocation = localStorage.getItem('location');

const initialState: AppContextInterface = {
  alertText: '',
  alertType: '',
  isLoading: false,
  showAlert: false,
  showSidebar: false,
  setShowLogout: false,

  user: user ? JSON.parse(user) : null,
  token: token ? token : null,
  userLocation: userLocation ? userLocation : null,
  jobLocation: '',
}

const AppContext = createContext<any>({});

const AppProvider = ({ children }: ChildrenPropType) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: ActionTypes.DISPLAY_ALERT });
  }

  const hideAlert = () => {
    dispatch({ type: ActionTypes.HIDE_ALERT });
  }

  const addUserToLocalStorage = (user: object, token: string, location: string) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('location', location);
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('location');
  }

  const registerUser = async (currentUser: object) => {
    dispatch({ type: ActionTypes.REGISTER_USER_BEGIN });
    try {
      const response = await fetch('/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      })
        .then(data => data.json());
      
      const { user, token, location }: any = response;
      
      dispatch({
        type: ActionTypes.REGISTER_USER_SUCCESS,
        payload: { user, token, location }
      });
      addUserToLocalStorage(user, token, location);
    } catch (error: any) {
      dispatch({ type: ActionTypes.REGISTER_USER_ERROR, msg: error.response.data });
      console.log(error.response.data)
    }
  }

  const loginUser = async (currentUser: object) => {
    dispatch({ type: ActionTypes.LOGIN_USER_BEGIN });
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(currentUser)
      })
        .then(data => data.json());
      const { user, token, location } = response;
      
      dispatch({
        type: ActionTypes.LOGIN_USER_SUCCESS,
        payload: { user, token, location }
      });
      addUserToLocalStorage(user, token, location);
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: ActionTypes.REGISTER_USER_ERROR,
        msg: error.response
      });
    }
  }

  const logoutUser = () => {
    try {
      dispatch({ type: ActionTypes.LOGOUT_USER });
      removeUserFromLocalStorage();
    } catch (error) {
      console.log("error");
    }
  }

  const toggleSidebar = () => {
    dispatch({ type: ActionTypes.TOGGLE_SIDEBAR });
  }

  return (
    <AppContext.Provider value={{
      ...state,
      displayAlert,
      hideAlert,
      registerUser,
      loginUser,
      logoutUser,
      toggleSidebar
    }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }