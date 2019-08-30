import {
  LOGIN,
  LOGOUT,
  SET_USER,
  LOGIN_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  user: {},
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
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      };
    case LOGIN_FAILED:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
