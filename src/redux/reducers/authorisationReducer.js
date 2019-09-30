import {
  REQUEST_LOGIN,
  LOGOUT,
  REQUEST_LOGIN_SUCSESS,
  REQUEST_LOGIN_FAILED,
  LOGIN_ERROR_CLEAR
} from "../action-types/flightsActionTypes";

const initialState = {
  user: {},
  message: null
};

export const authorisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return { ...state };
    case LOGOUT:
      return { ...state, token: null };
    case REQUEST_LOGIN_SUCSESS:
      return {
        ...state,
        user: action.payload.user
      };
    case REQUEST_LOGIN_FAILED:
      return { ...state, message: action.payload };
    case LOGIN_ERROR_CLEAR:
      return { ...state, message: null };
    default:
      return state;
  }
};
