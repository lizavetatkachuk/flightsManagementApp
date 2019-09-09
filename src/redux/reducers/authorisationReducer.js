import {
  REQUEST_LOGIN,
  LOGOUT,
  REQUEST_LOGIN_SUCSESS,
  REQUEST_LOGIN_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  user: {},
  token: null,
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
        token: action.payload.token,
        user: action.payload.user
      };
    case REQUEST_LOGIN_FAILED:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
