import {
  LOGIN,
  LOGOUT,
  SET_USER,
  LOGIN_FAILED
} from "../action-types/flightsActionTypes";

const initialState = {
  user: {},
  message: null
};

export const authorisationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state };
    case LOGOUT:
      return { ...state, user: null };
    case SET_USER:
      return {
        ...state,
        user: action.payload.user
      };
    case LOGIN_FAILED:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
