import {
  LOGIN,
  LOGOUT,
  SET_USER,
  LOGIN_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  token: null,
  message: null
};

export const authorisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state };
    case LOGOUT:
      return { ...state, token: null };
    case SET_USER:
      return { ...state, token: action.payload };
    case LOGIN_FAILED:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
